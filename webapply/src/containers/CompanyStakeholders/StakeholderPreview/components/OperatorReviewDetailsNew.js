/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { format, isValid } from "date-fns";
import { useDispatch } from "react-redux";

import {
  Input,
  AutoSaveField as Field,
  DatePicker,
  EmiratesID,
  SelectAutocomplete
} from "../../../../components/Form";
import {
  ALLOWED_CHAR_REGEX,
  ALPHANUMERIC_REGEX,
  EMIRATES_ID_REGEX,
  NAME_REGEX
} from "../../../../utils/validation";
import {
  MAX_FIRST_NAME_LENGTH,
  MAX_LAST_NAME_LENGTH,
  MAX_MIDDLE_NAME_LENGTH,
  MAX_MOTHER_MAIDEN_NAME_LENGTH,
  MIN_MOTHER_NAME_LENGTH
} from "../../../CompanyInfo/constants";
import {
  getInvalidMessage,
  getRequiredMessage,
  nameInvalidMessage
} from "../../../../utils/getValidationMessage";
import { DATE_FORMAT, UAE } from "../../../../constants";
import { Footer } from "../../../../components/Footer";
import { BackLink } from "../../../../components/Buttons/BackLink";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import routes from "../../../../routes";
import { updateProspect } from "../../../../store/actions/appConfig";

export const OperatorReviewDetails = ({
  isEditable,
  customerData,
  signatoryDetails,
  onClickNextSubmit
}) => {
  const dispatch = useDispatch();
  const [signatoryFullName, setSignatoryFullName] = useState("");

  const concatNames = (...nameParts) => {
    return nameParts
      .filter(Boolean)
      .join(" ")
      .trim();
  };
  useEffect(() => {
    /* istanbul ignore next */
    if (isEditable && signatoryDetails && signatoryDetails[0]) {
      const { firstName, middleName, lastName } = signatoryDetails[0];
      setSignatoryFullName(concatNames(firstName, middleName, lastName));
    }
  }, [signatoryDetails && signatoryDetails[0], isEditable]);

  const handleFullNameChange = useCallback(({ values, setFieldValue }) => event => {
    const { firstName, middleName, lastName } = values;
    const value = event.target.value;
    const target = event.target.name;
    setFieldValue(target, value);
    setFieldValue("fullName", concatNames(firstName, middleName, lastName));
    dispatch(
      updateProspect({
        "prospect.signatoryInfo[0].editedFullName": concatNames(firstName, middleName, lastName)
      })
    );
  });

  /* istanbul ignore next */
  const changeDateProspectHandler = useCallback(
    (_, value, path) => isValid(value) && { [path]: format(value, DATE_FORMAT) }
  );

  /* istanbul ignore next */
  const handleEmiratesIdChange = useCallback((prospect, value) => ({
    ...prospect,
    "prospect.signatoryInfo[0].kycDetails.emirateIdDetails.eidNumber": value.replace(/-/g, "")
  }));

  /* istanbul ignore next */
  const isMothersMaidenDisabled = customerData?.mothersMaidenName && !isEditable ? true : false;

  if (!signatoryFullName) {
    return <></>;
  }

  const operatorInitialValues = {
    fullName: signatoryFullName,
    firstName: "",
    middleName: "",
    lastName: "",
    mothersMaidenName: "",
    nationality: "",
    dateOfBirth: "",
    eidNumber: "",
    eidExpiryDt: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: ""
  };

  const operatorPreviewValidation = Yup.object({
    fullName: Yup.string()
      .required(getRequiredMessage("Full name"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(
        80,
        "Full name length cannot be more than 80 characters, please reduce / adjust character length in either first, middle or last name field"
      ),
    firstName: Yup.string()
      .required(getRequiredMessage("First name"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_FIRST_NAME_LENGTH, "Maximum ${max} characters allowed")
      .matches(NAME_REGEX, nameInvalidMessage),
    middleName: Yup.string()
      .nullable()
      .notRequired()
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_MIDDLE_NAME_LENGTH, "Maximum ${max} characters allowed")
      .matches(NAME_REGEX, nameInvalidMessage),
    lastName: Yup.string()
      .required(getRequiredMessage("Last name"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_LAST_NAME_LENGTH, "Maximum ${max} characters allowed")
      .matches(NAME_REGEX, nameInvalidMessage),
    mothersMaidenName: Yup.string()
      .required(getRequiredMessage("Mother's maiden name"))
      .min(
        MIN_MOTHER_NAME_LENGTH,
        `Mother's maiden name is too short. Please enter at least ${MIN_MOTHER_NAME_LENGTH} characters`
      )
      .max(
        MAX_MOTHER_MAIDEN_NAME_LENGTH,
        `Mother's maiden name is too long. Please enter up to ${MAX_MOTHER_MAIDEN_NAME_LENGTH} characters.`
      )
      .matches(NAME_REGEX, nameInvalidMessage),
    eidNumber: Yup.string().when("residenceCountry", {
      is: value => value === UAE,
      then: Yup.string()
        .required(getRequiredMessage("Emirates ID"))
        .transform(/* istanbul ignore next */ value => value.replace(/-/g, ""))
        .matches(EMIRATES_ID_REGEX, getInvalidMessage("Emirates ID"))
    }),
    passportNumber: Yup.string()
      .required(getRequiredMessage("Passport number"))
      .max(12, "Maximum 12 characters allowed")
      .matches(ALPHANUMERIC_REGEX, getInvalidMessage("Passport number")),
    passportIssueDate: Yup.string().required(getRequiredMessage("Passport issue")),
    passportExpiryDate: Yup.string().required(getRequiredMessage("Passport expiry")),
    eidExpiryDt: Yup.string().required(getRequiredMessage("Emirates ID expiry")),
    dateOfBirth: Yup.string().required(getRequiredMessage("Date of birth")),
    nationality: Yup.string().required(getRequiredMessage("Nationality"))
  });

  return (
    <Formik
      initialValues={operatorInitialValues}
      validationSchema={operatorPreviewValidation}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={onClickNextSubmit}
    >
      {({ values, setFieldValue, isSubmitting, errors, ...props }) => {
        /* istanbul ignore next */
        if (isSubmitting) {
          const el = document.querySelector(".Mui-error");
          const element = el && el.parentElement ? el.parentElement : el;
          element && element.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        return (
          <Form data-testid="operatorReviewDetailForm">
            <Grid container data-testid="operatorReviewForm">
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={false}
                  name="fullName"
                  path="prospect.signatoryInfo[0].editedFullName"
                  label="Full name"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0, maxLength: 80, "data-testid": "fullName" }
                  }}
                  disabled={isEditable}
                  showEditIcon={!isEditable}
                  fieldDescription={"Please ensure the full name is per your passport"}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="firstName"
                  path="prospect.signatoryInfo[0].firstName"
                  label="First name"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0, maxLength: 30, "data-testid": "firstName" },
                    onBlur: handleFullNameChange({ values, setFieldValue })
                  }}
                  fieldDescription={"Please ensure the first name is as per your passport"}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="middleName"
                  path="prospect.signatoryInfo[0].middleName"
                  label="Middle name"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0, maxLength: 30, "data-testid": "middleName" },
                    onBlur: handleFullNameChange({ values, setFieldValue })
                  }}
                  fieldDescription={"Please ensure the middle name is as per your passport"}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="lastName"
                  path="prospect.signatoryInfo[0].lastName"
                  label="Last name"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0, maxLength: 30, "data-testid": "lastName" },
                    onBlur: handleFullNameChange({ values, setFieldValue })
                  }}
                  disabled={!isEditable}
                  showEditIcon={!isEditable}
                  fieldDescription={"Please ensure the last name is as per your passport"}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="countryofBirth"
                  path="prospect.signatoryInfo[0].countryofBirth"
                  label="Country of birth"
                  datalistId="country"
                  component={SelectAutocomplete}
                  InputProps={{
                    inputProps: { tabIndex: 0, maxLength: MAX_MOTHER_MAIDEN_NAME_LENGTH }
                  }}
                  disabled={!isEditable}
                  showEditIcon={!isEditable}
                  fieldDescription={"Enter Country of birth"}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="mothersMaidenName"
                  path="prospect.signatoryInfo[0].mothersMaidenName"
                  label="Mother's maiden name"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0, maxLength: MAX_MOTHER_MAIDEN_NAME_LENGTH }
                  }}
                  allowedCharRegex={ALLOWED_CHAR_REGEX}
                  disabled={isMothersMaidenDisabled}
                  fieldDescription={"Enter Mother's maiden name as per your passport"}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="nationality"
                  path="prospect.signatoryInfo[0].kycDetails.nationality"
                  datalistId="nationality"
                  label="Nationality"
                  component={SelectAutocomplete}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="dateOfBirth"
                  path="prospect.signatoryInfo[0].kycDetails.dateOfBirth"
                  label="Date of birth"
                  component={DatePicker}
                  inputAdornmentPosition="end"
                  changeProspect={changeDateProspectHandler}
                  InputProps={{
                    inputProps: { tabIndex: 0, "data-testid": "dateOfBirth" }
                  }}
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="eidNumber"
                  path="prospect.signatoryInfo[0].kycDetails.emirateIdDetails.eidNumber"
                  label="Emirates ID"
                  placeholder="784-1950-1234567-8"
                  disabled={!isEditable}
                  component={EmiratesID}
                  changeProspect={handleEmiratesIdChange}
                  data-testid="emirateIdField"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="eidExpiryDt"
                  path="prospect.signatoryInfo[0].kycDetails.emirateIdDetails.eidExpiryDt"
                  label="Emirates ID expiry"
                  component={DatePicker}
                  changeProspect={changeDateProspectHandler}
                  InputProps={{
                    inputProps: { tabIndex: 0, "data-testid": "eidExpiryDate" }
                  }}
                  inputAdornmentPosition="end"
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="passportNumber"
                  path="prospect.signatoryInfo[0].kycDetails.passportDetails[0].passportNumber"
                  label="Passport number"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="passportIssueDate"
                  path="prospect.signatoryInfo[0].kycDetails.passportDetails[0].passportIssueDate"
                  label="Passport issue"
                  component={DatePicker}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  changeProspect={changeDateProspectHandler}
                  disabled={!isEditable}
                  inputAdornmentPosition="end"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="passportExpiryDate"
                  path="prospect.signatoryInfo[0].kycDetails.passportDetails[0].passportExpiryDate"
                  label="Passport expiry"
                  component={DatePicker}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  changeProspect={changeDateProspectHandler}
                  disabled={!isEditable}
                  inputAdornmentPosition="end"
                />
              </Grid>
            </Grid>
            <Footer dataTestId="footer">
              <BackLink path={routes.companyInfo} isTypeButton={true} />
              <NextStepButton
                label="Next"
                type="submit"
                justify="flex-end"
                data-testid="nextButton"
              />
            </Footer>
          </Form>
        );
      }}
    </Formik>
  );
};
