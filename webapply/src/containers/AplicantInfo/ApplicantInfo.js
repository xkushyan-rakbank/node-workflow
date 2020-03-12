import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { Grid } from "@material-ui/core";

import {
  Input,
  CustomSelect,
  InputGroup,
  AutoSaveField as Field,
  SkeletonLoader
} from "./../../components/Form";
import { SubmitButton } from "./../../components/Buttons/SubmitButton";
import { ErrorBoundaryForReCaptcha } from "../../components/ErrorBoundary";
import ReCaptcha from "../../components/ReCaptcha/ReCaptcha";
import { BackLink } from "../../components/Buttons/BackLink";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { getInvalidMessage, getRequiredMessage } from "../../utils/getValidationMessage";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { NAME_REGEX } from "./../../utils/validation";
import { receiveAppConfig } from "./../../store/actions/appConfig";
import { applicantInfoFormPromisify } from "../../store/actions/applicantInfoForm";
import { setToken } from "../../store/actions/reCaptcha";
import { resetScreeningError } from "../../store/actions/sendProspectToAPI";
import {
  getIsRecaptchaEnable,
  getAccountType,
  getIsIslamicBanking
} from "../../store/selectors/appConfig";
import {
  UAE_CODE,
  formStepper,
  applicationOverviewRoutesMap,
  ISLAMIC,
  CONVENTIONAL
} from "../../constants";
import routes from "../../routes";

const aplicantInfoSchema = Yup.object({
  fullName: Yup.string()
    .required(getRequiredMessage("Your Name"))
    .max(79, "Maximum 79 characters allowed")
    .matches(NAME_REGEX, getInvalidMessage("Your Name")),
  email: Yup.string()
    .required(getRequiredMessage("Your E-mail Address"))
    .max(50, "Maximum 50 characters allowed")
    .email(getInvalidMessage("Your E-mail Address")),
  countryCode: Yup.string().required(getRequiredMessage("Country code")),
  mobileNo: Yup.string()
    .required(getRequiredMessage("Your Mobile Number"))
    .phoneNo({ codeFieldName: "countryCode", fieldName: "Your Mobile Number" })
});

const initialValues = {
  fullName: "",
  email: "",
  countryCode: UAE_CODE,
  mobileNo: ""
};

const ApplicantInfoPage = ({
  submit,
  receiveAppConfig,
  setToken,
  reCaptchaToken,
  isRecaptchaEnable,
  resetScreeningError,
  isConfigLoading,
  accountType,
  isIslamicBanking
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const pushHistory = useTrackingHistory();
  useFormNavigation([false, false, formStepper]);

  useEffect(() => {
    receiveAppConfig();
  }, [receiveAppConfig]);

  useEffect(() => {
    resetScreeningError();
  }, [resetScreeningError]);

  const onSubmit = useCallback(
    values => {
      setIsLoading(true);
      submit(values).then(
        () => {
          pushHistory(
            process.env.REACT_APP_OTP_ENABLE === "N" ? routes.companyInfo : routes.verifyOtp,
            true
          );
        },
        () => {
          setIsLoading(false);
        }
      );
    },
    [submit, pushHistory]
  );
  const handleReCaptchaVerify = useCallback(
    token => {
      setToken(token);
    },
    [setToken]
  );
  const handleVerifiedFailed = useCallback(() => {
    setToken(null);
  }, [setToken]);

  return (
    <>
      <h2>Let’s Start with the Basics</h2>
      <p className="formDescription">
        First things first, you need a login, so you can come back to the application in case you
        cannot complete it in one go.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={aplicantInfoSchema}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form>
            {isConfigLoading ? (
              <SkeletonLoader />
            ) : (
              <Field
                name="fullName"
                path="prospect.applicantInfo.fullName"
                label="Your Name"
                placeholder="Your Name"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            )}

            {isConfigLoading ? (
              <SkeletonLoader />
            ) : (
              <Field
                name="email"
                path="prospect.applicantInfo.email"
                label="Your E-mail Address"
                placeholder="Email"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            )}

            {isConfigLoading ? (
              <SkeletonLoader />
            ) : (
              <InputGroup>
                <Field
                  name="countryCode"
                  path="prospect.applicantInfo.countryCode"
                  required
                  datalistId="countryCode"
                  component={CustomSelect}
                  shrink={false}
                  inputProps={{ tabIndex: 0 }}
                />
                <Field
                  name="mobileNo"
                  path="prospect.applicantInfo.mobileNo"
                  label="Your Mobile Number"
                  placeholder="Mobile Number"
                  component={Input}
                  contextualHelpText="This number should be unique for a Company"
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                />
              </InputGroup>
            )}

            <Grid container direction="row" justify="space-between" alignItems="center">
              {isRecaptchaEnable && (
                <ErrorBoundaryForReCaptcha>
                  <ReCaptcha
                    onVerify={handleReCaptchaVerify}
                    onExpired={handleVerifiedFailed}
                    onError={handleVerifiedFailed}
                  />
                </ErrorBoundaryForReCaptcha>
              )}
              <div className="linkContainer">
                <BackLink
                  path={
                    applicationOverviewRoutesMap[accountType][
                      isIslamicBanking ? ISLAMIC : CONVENTIONAL
                    ]
                  }
                />
                <SubmitButton
                  disabled={
                    !values.fullName ||
                    !values.email ||
                    !values.mobileNo ||
                    isLoading ||
                    (!reCaptchaToken && isRecaptchaEnable)
                  }
                  justify="flex-end"
                  label="Next Step"
                />
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = state => ({
  reCaptchaToken: state.reCaptcha.token,
  isConfigLoading: state.appConfig.loading,
  isRecaptchaEnable: getIsRecaptchaEnable(state),
  accountType: getAccountType(state),
  isIslamicBanking: getIsIslamicBanking(state)
});

const mapDispatchToProps = {
  resetScreeningError,
  receiveAppConfig,
  submit: applicantInfoFormPromisify,
  setToken
};

export const ApplicantInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantInfoPage);
