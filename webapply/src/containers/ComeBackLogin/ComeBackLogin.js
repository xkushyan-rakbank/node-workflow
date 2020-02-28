import React, { useEffect, useCallback } from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";

import {
  Input,
  CustomSelect,
  InputGroup,
  AutoSaveField as Field,
  SkeletonLoader
} from "./../../components/Form";
import {
  UAE_MOBILE_PHONE_REGEX,
  NUMBER_REGEX,
  MIN_NON_UAE_PHONE_LENGTH,
  MAX_NON_UAE_PHONE_LENGTH
} from "./../../utils/validation";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import ReCaptcha from "../../components/ReCaptcha/ReCaptcha";
import { ErrorBoundaryForReCaptcha } from "../../components/ErrorBoundary";
import { setToken } from "../../store/actions/reCaptcha";
import { generateOtpCode } from "../../store/actions/otp";
import { getIsGenerating, isOtpGenerated } from "../../store/selectors/otp";
import { getIsRecaptchaEnable } from "../../store/selectors/appConfig";
import routes from "./../../routes";
import { UAE_CODE } from "../../constants";
import { getRequiredMessage, getInvalidMessage } from "../../utils/getValidationMessage";
import { useStyles } from "./styled";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
export const MAX_LENGTH_EMAIL = 50;

const comebackSchema = Yup.object({
  email: Yup.string()
    .required(getRequiredMessage("Your E-mail Address"))
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
        .max(
          MAX_NON_UAE_PHONE_LENGTH,
          `${getInvalidMessage("Your Mobile Number")} (max length exceeded)`
        )
    })
});

const ComeBackLoginComponent = ({
  generateOtpCode,
  isOtpGenerated,
  setToken,
  recaptchaToken,
  isRecaptchaEnable,
  isGenerating,
  isConfigLoading
}) => {
  const pushHistory = useTrackingHistory();
  const classes = useStyles();
  const submitForm = useCallback(
    values => {
      let loginData = { ...values };

      if (isRecaptchaEnable) {
        loginData.recaptchaToken = recaptchaToken;
      }

      generateOtpCode(loginData);
    },
    [generateOtpCode, recaptchaToken, isRecaptchaEnable]
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

  useEffect(() => {
    if (isOtpGenerated) {
      pushHistory(
        process.env.REACT_APP_OTP_ENABLE === "N"
          ? routes.MyApplications
          : routes.comeBackLoginVerification
      );
    }
  }, [pushHistory, isOtpGenerated]);

  return (
    <div className={classes.centeredContainer}>
      <SectionTitleWithInfo
        title="Wondering about your application? You came to the right place."
        info="Please enter the login you used when you first applied"
      />
      <Formik
        initialValues={{
          email: "",
          countryCode: UAE_CODE,
          mobileNo: ""
        }}
        validationSchema={comebackSchema}
        validateOnChange={false}
        onSubmit={submitForm}
      >
        {({ values }) => (
          <Form className={classes.form}>
            <div>
              {isConfigLoading ? (
                <SkeletonLoader />
              ) : (
                <Field
                  name="email"
                  path="prospect.applicantInfo.email"
                  label="Your E-mail Address"
                  placeholder="Email"
                  component={Input}
                  isLoadDefaultValueFromStore={false}
                  InputProps={{
                    inputProps: { maxLength: MAX_LENGTH_EMAIL, tabIndex: 0 }
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
                    extractLabel={item => item.displayText}
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
                    isLoadDefaultValueFromStore={false}
                    InputProps={{
                      inputProps: { tabIndex: 0 }
                    }}
                  />
                </InputGroup>
              )}
              <Grid container direction="row" justify="flex-start" alignItems="center">
                {isRecaptchaEnable && (
                  <ErrorBoundaryForReCaptcha>
                    <ReCaptcha
                      onVerify={handleReCaptchaVerify}
                      onExpired={handleVerifiedFailed}
                      onError={handleVerifiedFailed}
                    />
                  </ErrorBoundaryForReCaptcha>
                )}
              </Grid>
            </div>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <div className={cx(classes.btnWrapper, "linkContainer")}>
                <SubmitButton
                  disabled={
                    !values.email ||
                    !values.mobileNo ||
                    isGenerating ||
                    (isRecaptchaEnable && !recaptchaToken)
                  }
                  justify="flex-end"
                  label="Next Step"
                />
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => ({
  recaptchaToken: state.reCaptcha.token,
  isOtpGenerated: isOtpGenerated(state),
  isRecaptchaEnable: getIsRecaptchaEnable(state),
  isGenerating: getIsGenerating(state),
  isConfigLoading: state.appConfig.loading
});

const mapDispatchToProps = {
  generateOtpCode,
  setToken
};

export const ComeBackLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComeBackLoginComponent);
