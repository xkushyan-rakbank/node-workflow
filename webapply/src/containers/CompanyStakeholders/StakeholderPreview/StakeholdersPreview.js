/* eslint-disable max-len */
import React, { useCallback, useState } from "react";
import { Form, Formik } from "formik";
import { Grid } from "@material-ui/core";
import { format, isValid } from "date-fns";
import cx from "classnames";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import { useStyles } from "../components/CompanyStakeholders/styled";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import { DATE_FORMAT, NEXT, UAE, formStepper, operatorLoginScheme } from "../../../constants";
import { ReactComponent as SuccessIcon } from "../../../assets/icons/credit_score.svg";
import {
  Input,
  AutoSaveField as Field,
  DatePicker,
  EmiratesID,
  SelectAutocomplete
} from "../../../components/Form";
import routes from "../../../routes";
import { OverlayLoader } from "../../../components/Loader";
import { useFormNavigation } from "../../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../../FormLayout";
import { useViewId } from "../../../utils/useViewId";
import { BackLink } from "../../../components/Buttons/BackLink";
import {
  MAX_FULL_NAME_LENGTH,
  MAX_MOTHER_MAIDEN_NAME_LENGTH,
  MIN_MOTHER_NAME_LENGTH
} from "../../CompanyInfo/constants";
import { getInvalidMessage, getRequiredMessage } from "../../../utils/getValidationMessage";
import { NAME_REGEX, EMIRATES_ID_REGEX, ALPHANUMERIC_REGEX } from "../../../utils/validation";
import { Footer } from "../../../components/Footer";
import { getProspect } from "../../../store/selectors/appConfig";
import { getLoginResponse } from "../../../store/selectors/loginSelector";

export const StakeholdersPreview = ({ sendProspectToAPI }) => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);
  const { scheme } = useSelector(getLoginResponse);

  const isOperator = scheme === operatorLoginScheme;

  const { signatoryInfo } = useSelector(getProspect);

  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    fullName: "",
    mothersMaidenName: "",
    nationality: "",
    dateOfBirth: "",
    eidNumber: "",
    eidExpiryDt: "",
    passportNumber: "",
    passportExpiryDate: ""
  };

  const previewValidation = Yup.object({
    fullName: Yup.string()
      .required(getRequiredMessage("Fullname"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_FULL_NAME_LENGTH, "Maximum ${max} characters allowed")
      .matches(NAME_REGEX, "Please remove any special character from your name"),
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
      .matches(NAME_REGEX, "Please enter a valid mother's maiden name as per your passport"),
    eidNumber: Yup.string().when("residenceCountry", {
      is: value => value === UAE,
      then: Yup.string()
        .required(getRequiredMessage("Emirates ID"))
        .transform(value => value.replace(/-/g, ""))
        .matches(EMIRATES_ID_REGEX, getInvalidMessage("Emirates ID"))
    }),
    passportNumber: Yup.string()
      .required(getRequiredMessage("Passport number"))
      .max(12, "Maximum 12 characters allowed")
      .matches(ALPHANUMERIC_REGEX, getInvalidMessage("Passport number")),
    passportExpiryDate: Yup.string().required(getRequiredMessage("Passport expiry")),
    eidExpiryDt: Yup.string().required(getRequiredMessage("Emirates ID expiry")),
    dateOfBirth: Yup.string().required(getRequiredMessage("Date of birth")),
    nationality: Yup.string().required(getRequiredMessage("Nationality"))
  });

  const changeDateProspectHandler = (_, value, path) =>
    isValid(value) && { [path]: format(value, DATE_FORMAT) };

  const handleClickStakeholderPreviewNextStep = useCallback(() => {
    setIsLoading(true);
    return sendProspectToAPI(NEXT).then(
      isScreeningError => {
        if (!isScreeningError) {
          pushHistory(routes.StakeholderTermsAndConditions, true);
        }
      },
      () => setIsLoading(false)
    );
  }, [pushHistory, sendProspectToAPI]);

  return (
    <>
      <div className={classes.completedScanInfoWrapper}>
        <SuccessIcon />
        <span>Scanning successfully completed</span>
      </div>
      <h3 className={classes.mainTitle}>Did we get everything?</h3>
      <p className={cx(classes.subTitle, classes["mb-40"])}>
        Take a minute to review the details we pulled from your documents. You won't be able to make
        any changes after this step.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={previewValidation}
        onSubmit={handleClickStakeholderPreviewNextStep}
      >
        {props => (
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="fullName"
                  path="prospect.signatoryInfo[0].editedFullName"
                  label="Name"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0, maxLength: 100 }
                  }}
                  disabled={!isOperator}
                  className="testingClass"
                  showEditIcon={!isOperator}
                  fieldDescription={"Please ensure the full name is per your passport"}
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
                    inputProps: { tabIndex: 0, maxLength: 100 }
                  }}
                  disabled={signatoryInfo[0]?.mothersMaidenName && !isOperator ? true : false}
                  className="testingClass"
                  showEditIcon={!signatoryInfo[0]?.mothersMaidenName ? true : false}
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
                  disabled={!isOperator}
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
                    inputProps: { tabIndex: 0 }
                  }}
                  disabled={!isOperator}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="eidNumber"
                  path="prospect.signatoryInfo[0].kycDetails.emirateIdDetails.eidNumber"
                  label="Emirates ID"
                  placeholder="784-1950-1234567-8"
                  disabled={!isOperator}
                  component={EmiratesID}
                  changeProspect={(prospect, value) => ({
                    ...prospect,
                    ["prospect.signatoryInfo[0].kycDetails.emirateIdDetails.eidNumber"]: value.replace(
                      /-/g,
                      ""
                    )
                  })}
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
                    inputProps: { tabIndex: 0 }
                  }}
                  inputAdornmentPosition="end"
                  disabled={!isOperator}
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
                  disabled={!isOperator}
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
                  disabled={!isOperator}
                  inputAdornmentPosition="end"
                />
              </Grid>
            </Grid>
            <Footer>
              <BackLink
                path={isOperator ? routes.companyInfo : routes.stakeholdersInfo}
                isTypeButton={true}
              />
              <NextStepButton label="Next" type="submit" justify="flex-end" />
            </Footer>
          </Form>
        )}
      </Formik>
      <OverlayLoader open={isLoading} text={"Don't go anywhere...this will just take a minute!"} />
    </>
  );
};
