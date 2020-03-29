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
  SkeletonLoader,
  LinkedField
} from "./../../components/Form";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import ReCaptcha from "../../components/ReCaptcha/ReCaptcha";
import { ErrorBoundaryForReCaptcha } from "../../components/ErrorBoundary";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { setToken } from "../../store/actions/reCaptcha";
import { resetProspect } from "../../store/actions/appConfig";
import { generateOtpCode } from "../../store/actions/otp";
import { getIsGenerating, isOtpGenerated } from "../../store/selectors/otp";
import { getIsRecaptchaEnable } from "../../store/selectors/appConfig";
import { getRequiredMessage, getInvalidMessage } from "../../utils/getValidationMessage";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "./../../routes";
import { UAE_CODE } from "../../constants";

import { useStyles } from "./styled";

export const MAX_LENGTH_EMAIL = 50;

const comebackSchema = Yup.object({
  email: Yup.string()
    .required(getRequiredMessage("Your E-mail Address"))
    .email(getInvalidMessage("Your E-mail Address")),
  countryCode: Yup.string().required(getRequiredMessage("Country code")),
  mobileNo: Yup.string()
    .required(getRequiredMessage("Your Mobile Number"))
    .phoneNo({ codeFieldName: "countryCode", fieldName: "Your Mobile Number" })
});

const ComeBackLoginComponent = ({
  generateOtpCode,
  isOtpGenerated,
  setToken,
  resetProspect,
  recaptchaToken,
  isRecaptchaEnable,
  isGenerating,
  isConfigLoading
}) => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  useFormNavigation([true, false]);

  useEffect(() => {
    resetProspect();
  }, [resetProspect]);

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
          : routes.comeBackLoginVerification,
        true
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
                  <LinkedField
                    name="countryCode"
                    linkedFieldName="mobileNo"
                    path="prospect.applicantInfo.countryCode"
                    linkedPath="prospect.applicantInfo.mobileNo"
                    required
                    datalistId="countryCode"
                    extractLabel={item => item.displayText}
                    component={CustomSelect}
                    shrink={false}
                    inputProps={{ tabIndex: 0 }}
                  />

                  <LinkedField
                    name="mobileNo"
                    linkedFieldName="countryCode"
                    path="prospect.applicantInfo.mobileNo"
                    linkedPath="prospect.applicantInfo.countryCode"
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
  setToken,
  resetProspect
};

export const ComeBackLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComeBackLoginComponent);
