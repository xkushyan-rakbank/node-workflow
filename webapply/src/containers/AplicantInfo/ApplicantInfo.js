import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { Grid } from "@material-ui/core";

import {
  NUMBER_REGEX,
  UAE_MOBILE_PHONE_REGEX,
  MAX_NON_UAE_PHONE_LENGTH,
  MIN_NON_UAE_PHONE_LENGTH,
  NAME_REGEX
} from "./../../utils/validation";
import {
  Input,
  CustomSelect,
  InputGroup,
  AutoSaveField as Field,
  SkeletonLoader
} from "./../../components/Form";
import { SubmitButton } from "./../../components/Buttons/SubmitButton";
import { receiveAppConfig } from "./../../store/actions/appConfig";
import { applicantInfoFormPromisify } from "../../store/actions/applicantInfoForm";
import { UAE_CODE } from "../../constants";
import { ErrorBoundaryForReCaptcha } from "../../components/ErrorBoundary";
import ReCaptcha from "../../components/ReCaptcha/ReCaptcha";
import { BackLink } from "../../components/Buttons/BackLink";
import { setToken } from "../../store/actions/reCaptcha";
import { resetScreeningError } from "../../store/actions/sendProspectToAPI";
import { getIsRecaptchaEnable } from "../../store/selectors/appConfig";
import routes from "../../routes";
import { getInvalidMessage, getRequiredMessage } from "../../utils/getValidationMessage";
import { useTrackingHistory } from "../../utils/useTrackingHistory";

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
    .when("countryCode", {
      is: countryCode => countryCode === UAE_CODE,
      then: Yup.string().matches(UAE_MOBILE_PHONE_REGEX, getInvalidMessage("Your Mobile Number")),
      otherwise: Yup.string()
        .matches(NUMBER_REGEX, getInvalidMessage("Your Mobile Number"))
        .min(
          MIN_NON_UAE_PHONE_LENGTH,
          `${getInvalidMessage("Your Mobile Number")} (min length is not reached)`
        )
        .test(
          "length validation",
          `${getInvalidMessage("Your Mobile Number")} (max length exceeded)`,
          function() {
            const { countryCode = "", mobileNo = "" } = this.parent;
            return countryCode.length + mobileNo.length <= MAX_NON_UAE_PHONE_LENGTH;
          }
        )
    })
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
  isConfigLoading
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const pushHistory = useTrackingHistory();
  useEffect(() => {
    const pathname = typeof window !== "undefined" ? window.location.pathname : "/sme/";
    const segment = pathname.substring(1, pathname.lastIndexOf("/"));

    receiveAppConfig(segment);
    resetScreeningError();
  }, [receiveAppConfig, resetScreeningError]);

  const onSubmit = useCallback(
    values => {
      setIsLoading(true);
      submit(values).then(
        () => {
          pushHistory(
            process.env.REACT_APP_OTP_ENABLE === "N" ? routes.companyInfo : routes.verifyOtp
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
                changeProspect={(_, value, path) => ({ [path]: value.toUpperCase() })}
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
                <BackLink path={routes.accountsComparison} />
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
  isRecaptchaEnable: getIsRecaptchaEnable(state)
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
