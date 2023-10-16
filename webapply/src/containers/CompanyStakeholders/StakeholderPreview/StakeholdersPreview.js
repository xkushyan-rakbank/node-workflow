/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { get } from "lodash";
import { Grid } from "@material-ui/core";
import { format, isValid } from "date-fns";
import cx from "classnames";

import { useStyles } from "../components/CompanyStakeholders/styled";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import { DATE_FORMAT, NEXT, UAE, formStepper, operatorLoginScheme } from "../../../constants";
import { ReactComponent as SuccessIcon } from "../../../assets/icons/credit_score.svg";
import {
  Input,
  AutoSaveField as Field,
  InlineRadioGroup,
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
  MAX_FIRST_NAME_LENGTH,
  MAX_LAST_NAME_LENGTH,
  MAX_MIDDLE_NAME_LENGTH,
  MAX_MOTHER_MAIDEN_NAME_LENGTH,
  MIN_MOTHER_NAME_LENGTH
} from "../../CompanyInfo/constants";
import { getInvalidMessage, getRequiredMessage } from "../../../utils/getValidationMessage";
import { NAME_REGEX, EMIRATES_ID_REGEX, ALPHANUMERIC_REGEX } from "../../../utils/validation";
import { Footer } from "../../../components/Footer";
import { getDatalist, getProspect, getProspectId } from "../../../store/selectors/appConfig";
import { getLoginResponse } from "../../../store/selectors/loginSelector";
import { updateProspect } from "../../../store/actions/appConfig";
import { getSearchResults } from "../../../store/selectors/searchProspect";
import { OPE_EDIT } from "../../AgentPages/SearchedAppInfo/constants";

export const StakeholdersPreview = ({ sendProspectToAPI }) => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);
  const { scheme } = useSelector(getLoginResponse);
  const dispatch = useDispatch();
  const prospect = useSelector(getProspect);
  const prospectId = useSelector(getProspectId);

  const searchResults = useSelector(getSearchResults);
  const currentProspect = searchResults.find(item => item.prospectId === prospectId);

  const isFrontCorrection = get(currentProspect, "status.statusType") === OPE_EDIT;
  const isOperator = scheme === operatorLoginScheme;
  const isEditable = isOperator && isFrontCorrection;

  const [displayFields, setDisplayFields] = useState({});

  const { nationality: nationality } = useSelector(getDatalist);

  const getNationalityLabel = useCallback(
    code => nationality?.find(nationality => nationality.code === code)?.displayText,
    [displayFields, nationality]
  );

  const [isLoading, setIsLoading] = useState(false);

  const customerInitValues = {
    questionInput: ""
  };

  const operatorInitialValues = {
    fullName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    mothersMaidenName: "",
    nationality: "",
    dateOfBirth: "",
    eidNumber: "",
    eidExpiryDt: "",
    passportNumber: "",
    passportExpiryDate: ""
  };

  const labelTextForNoEfrIncorrect = (
    <span style={{ display: "flex", alignItems: "center" }}>
      <p style={{ margin: "0px" }}>
        No
        <span style={{ fontSize: "14px", color: "#757575" }}>
          (We'll call you to fix any issues)
        </span>
      </p>
    </span>
  );

  const stakePreviewYesNoOptions = [
    {
      code: "Yes",
      key: "Yes",
      value: true,
      label: "Yes"
    },
    {
      code: "No",
      key: "No",
      value: false,
      label: labelTextForNoEfrIncorrect
    }
  ];

  const customerPreviewValidation = Yup.object({
    questionInput: Yup.boolean()
      .typeError(getRequiredMessage("This field"))
      .required(getRequiredMessage("This field"))
  });

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
      .matches(NAME_REGEX, "Please remove any special character from your name"),
    middleName: Yup.string()
      .notRequired()
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_MIDDLE_NAME_LENGTH, "Maximum ${max} characters allowed")
      .matches(NAME_REGEX, "Please remove any special character from your name"),
    lastName: Yup.string()
      .required(getRequiredMessage("Last name"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_LAST_NAME_LENGTH, "Maximum ${max} characters allowed")
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

  const formatEidNumber = number => {
    const cleanNumber = String(number).replace(/\D/g, "");

    const formattedNumber = cleanNumber.replace(/(\d{3})(\d{4})(\d{7})(\d{1})/, "$1-$2-$3-$4");

    return formattedNumber;
  };

  const formatDate = useCallback(date => (date ? format(new Date(date), "dd/MM/yyyy") : ""), [
    displayFields
  ]);

  const selectRadioBoolean = ({ values, setFieldValue }) => async event => {
    const value = JSON.parse(event.target.value);
    const name = event.target.name;
    await setFieldValue(name, value);
    dispatch(updateProspect({ "prospect.signatoryInfo[0].isEFRDataCorrect": value }));
  };

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

  useEffect(() => {
    if (prospect) {
      const { signatoryInfo } = prospect;
      const fields = {
        signatoryFullName: signatoryInfo && signatoryInfo[0]?.editedFullName,
        signatoryNationality:
          signatoryInfo && getNationalityLabel(signatoryInfo[0]?.kycDetails?.nationality),
        dateOfBirth: signatoryInfo && formatDate(signatoryInfo[0]?.kycDetails?.dateOfBirth),
        mothersMaidenName: (signatoryInfo && signatoryInfo[0]?.mothersMaidenName) || "-",
        eidNumber:
          signatoryInfo &&
          formatEidNumber(signatoryInfo[0]?.kycDetails?.emirateIdDetails?.eidNumber),
        eidExpiryDt:
          signatoryInfo && formatDate(signatoryInfo[0]?.kycDetails?.emirateIdDetails?.eidExpiryDt),
        passportNumber:
          signatoryInfo && signatoryInfo[0]?.kycDetails?.passportDetails[0].passportNumber,
        passportExpiryDate:
          signatoryInfo &&
          formatDate(signatoryInfo[0]?.kycDetails?.passportDetails[0].passportExpiryDate)
      };
      setDisplayFields(fields);
    }
  }, [prospect]);

  const customerReviewDetails = () => {
    return (
      <div className={classes.reviewDetails}>
        <div>
          <h5 className={classes.reviewDetailsTitle}>Essential information</h5>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Full name:</label>
          <p>{displayFields.signatoryFullName}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Nationality:</label>
          <p>{displayFields.signatoryNationality}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Date of birth:</label>
          <p>{displayFields.dateOfBirth}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Mother's maiden name:</label>
          <p>{displayFields.mothersMaidenName}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Emirates ID number:</label>
          <p>{displayFields.eidNumber}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Emirates ID expiry date:</label>
          <p>{displayFields.eidExpiryDt}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Passport number:</label>
          <p>{displayFields.passportNumber}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Passport expiry:</label>
          <p>{displayFields.passportExpiryDate}</p>
        </div>
      </div>
    );
  };

  const OperatorReviewDetails = (values, isSubmitting, setFieldValue) => {
    if (isSubmitting) {
      const el = document.querySelector(".Mui-error");
      const element = el && el.parentElement ? el.parentElement : el;
      element && element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const {
      firstName: signatoryFirstName,
      middleName: signatoryMiddleName,
      lastName: signatoryLastName
    } = values;

    useEffect(() => {
      const concatNames = (...nameParts) => nameParts.join(" ").trim();
      setFieldValue(
        "fullName",
        concatNames(signatoryFirstName, signatoryMiddleName, signatoryLastName)
      );
    }, [signatoryFirstName, signatoryMiddleName, signatoryLastName]);

    return (
      <>
        <Grid item xs={12}>
          <Field
            isLoadDefaultValueFromStore={false}
            name="fullName"
            path="prospect.signatoryInfo[0].editedFullName"
            label="Full name"
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: 80 }
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
              inputProps: { tabIndex: 0, maxLength: 30 }
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
              inputProps: { tabIndex: 0, maxLength: 30 }
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
              inputProps: { tabIndex: 0, maxLength: 30 }
            }}
            disabled={!isEditable}
            showEditIcon={!isEditable}
            fieldDescription={"Please ensure the last name is as per your passport"}
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
            disabled={displayFields?.mothersMaidenName && !isEditable ? true : false}
            showEditIcon={!displayFields?.mothersMaidenName ? true : false}
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
              inputProps: { tabIndex: 0 }
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
      </>
    );
  };

  const customerConfirmEFRDetails = radioChangeHandler => {
    return (
      <>
        <div className={classes.informationQuestion}>Is all of your information correct?</div>
        <Field
          typeRadio
          options={stakePreviewYesNoOptions}
          name="questionInput"
          path="prospect.signatoryInfo[0].isEFRDataCorrect"
          component={InlineRadioGroup}
          customIcon={false}
          classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
          radioColor="primary"
          onChange={radioChangeHandler}
        />
        <div>
          <p className={classes.reviewRemarks}>
            If not, don't worry—you can continue with your application. We'll reach out to you
            within 48 hours to help make any corrections.
          </p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={classes.completedScanInfoWrapper}>
        <SuccessIcon />
        <span>Scanning successfully completed</span>
      </div>
      {isEditable ? (
        <>
          <h3 className={classes.mainTitle}>Did we get everything?</h3>
          <p className={cx(classes.subTitle, classes["mb-40"])}>
            Take a minute to review the details we pulled from your documents. You won't be able to
            make any changes after this step.
          </p>
        </>
      ) : (
        <>
          <h3 className={classes.mainTitle}>Review the details we pulled from your documents</h3>
          <p className={cx(classes.subTitle, classes["mb-40"])}>
            These will be submitted with your application.
          </p>
        </>
      )}

      {!isEditable && customerReviewDetails()}
      <Formik
        initialValues={isEditable ? operatorInitialValues : customerInitValues}
        validationSchema={isEditable ? operatorPreviewValidation : customerPreviewValidation}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleClickStakeholderPreviewNextStep}
      >
        {({ values, setFieldValue, isSubmitting, ...props }) => {
          const radioChangeHandler = selectRadioBoolean({ values, setFieldValue });

          return (
            <Form>
              <Grid container>
                {!isEditable && (
                  <Grid item xs={12}>
                    {customerConfirmEFRDetails(radioChangeHandler)}
                  </Grid>
                )}
                {isEditable && OperatorReviewDetails(values, isSubmitting, setFieldValue)}
              </Grid>
              <Footer>
                <BackLink
                  path={isEditable ? routes.companyInfo : routes.stakeholdersInfo}
                  isTypeButton={true}
                />
                <NextStepButton label="Next" type="submit" justify="flex-end" />
              </Footer>
            </Form>
          );
        }}
      </Formik>
      <OverlayLoader open={isLoading} text={"Don't go anywhere...this will just take a minute!"} />
    </>
  );
};
