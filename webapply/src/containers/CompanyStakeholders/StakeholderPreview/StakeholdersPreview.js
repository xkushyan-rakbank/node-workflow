/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Grid } from "@material-ui/core";
import cx from "classnames";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useStyles } from "../components/CompanyStakeholders/styled";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import {  NEXT, formStepper, operatorLoginScheme } from "../../../constants";
import { ReactComponent as SuccessIcon } from "../../../assets/icons/credit_score.svg";
import {
  AutoSaveField as Field,
  InlineRadioGroup
} from "../../../components/Form";
import routes from "../../../routes";
import { OverlayLoader } from "../../../components/Loader";
import { useFormNavigation } from "../../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../../FormLayout";
import { useViewId } from "../../../utils/useViewId";
import { BackLink } from "../../../components/Buttons/BackLink";
import { getRequiredMessage } from "../../../utils/getValidationMessage";
import { Footer } from "../../../components/Footer";
import { getDatalist, getProspect } from "../../../store/selectors/appConfig";
import { getLoginResponse } from "../../../store/selectors/loginSelector";
import { updateProspect } from "../../../store/actions/appConfig";

export const StakeholdersPreview = ({ sendProspectToAPI }) => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);
  const { scheme } = useSelector(getLoginResponse);
  const dispatch = useDispatch();

  const prospect = useSelector(getProspect);
  const [displayFields, setDisplayFields] = useState({});

  const { nationality: nationality } = useSelector(getDatalist);

  const getNationalityLabel = useCallback(
    code => nationality?.find(nationality => nationality.code === code)?.displayText,
    [displayFields, nationality]
  );

  const isOperator = scheme === operatorLoginScheme;

  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    questionInput: ""
  };

  const labelTextForNoEfrIncorrect = (
    <span style={{ display: "flex", alignItems: "center" }}>
      <p style={{ margin: "0px" }}>
        No{" "}
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

  const previewValidation = Yup.object({
    questionInput: Yup.string().required(getRequiredMessage("This field"))
  });

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
          signatoryInfo && getNationalityLabel(signatoryInfo[0]?.kycDetails.nationality),
        dateOfBirth: signatoryInfo && signatoryInfo[0]?.kycDetails.dateOfBirth,
        mothersMaidenName: (signatoryInfo && signatoryInfo[0]?.mothersMaidenName) || "-",
        eidNumber: signatoryInfo && signatoryInfo[0]?.kycDetails.emirateIdDetails.eidNumber,
        eidExpiryDt: signatoryInfo && signatoryInfo[0]?.kycDetails.emirateIdDetails.eidExpiryDt,
        passportNumber:
          signatoryInfo && signatoryInfo[0]?.kycDetails.passportDetails[0].passportNumber,
        passportExpiryDate:
          signatoryInfo && signatoryInfo[0]?.kycDetails.passportDetails[0].passportExpiryDate
      };
      setDisplayFields(fields);
    }
  }, [prospect]);

  return (
    <>
      <div className={classes.completedScanInfoWrapper}>
        <SuccessIcon />
        <span>Scanning successfully completed</span>
      </div>
      <h3 className={classes.mainTitle}>Review the details we pulled from your documents</h3>
      <p className={cx(classes.subTitle, classes["mb-40"])}>
        These will be submitted with your application.
      </p>
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
      <Formik
        initialValues={initialValues}
        validationSchema={previewValidation}
        onSubmit={handleClickStakeholderPreviewNextStep}
      >
        {({ values, setFieldValue, ...props }) => {
          const radioChangeHandler = selectRadioBoolean({ values, setFieldValue });

          return (
            <Form>
              <Grid container>
                <Grid item xs={12}>
                  <div className={classes.informationQuestion}>
                    Is all of your information correct?
                  </div>
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
                      If not, don't worry—you can continue with your application. We'll reach out to
                      you within 48 hours to help make any corrections.
                    </p>
                  </div>
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
          );
        }}
      </Formik>
      <OverlayLoader open={isLoading} text={"Don't go anywhere...this will just take a minute!"} />
    </>
  );
};
