import React, { useEffect, useCallback } from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";

import { Input, CustomSelect, InputGroup, AutoSaveField as Field } from "./../../components/Form";
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
import { setToken, setVerified } from "../../store/actions/reCaptcha";
import { generateOtpCode } from "../../store/actions/otp";
import { isOtpGenerated } from "../../store/selectors/otp";
import { getIsRecaptchaEnable } from "../../store/selectors/appConfig";
import routes from "./../../routes";
import { UAE_CODE } from "../../constants";
import { getRequiredMessage, getInvalidMessage } from "../../utils/getValidationMessage";
import { useStyles } from "./styled";

const comebackSchema = Yup.object({
  email: Yup.string()
    .required(getRequiredMessage("Your E-mail Address"))
    .email(getInvalidMessage("Your E-mail Address")),
  countryCode: Yup.string().required(getRequiredMessage("Country code")),
  mobileNo: Yup.string()
    .required(getRequiredMessage("Your Mobile Number"))
    .when("countryCode", {
      is: countryCode => countryCode === UAE_CODE,
      then: Yup.string().matches(UAE_MOBILE_PHONE_REGEX, "Field Mobile number is invalid"),
      otherwise: Yup.string()
        .matches(NUMBER_REGEX, getInvalidMessage("Your Mobile Number"))
        .min(MIN_NON_UAE_PHONE_LENGTH, "This is not a valid phone (min length is not reached)")
        .test("length validation", "This is not a valid phone (max length exceeded)", function() {
          const { countryCode = "", mobileNo = "" } = this.parent;
          return countryCode.length + mobileNo.length <= MAX_NON_UAE_PHONE_LENGTH;
        })
    })
});

const ComeBackLoginComponent = ({
  history,
  generateOtpCode,
  isOtpGenerated,
  setToken,
  setVerified,
  recaptchaToken,
  isRecaptchaEnable
}) => {
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
    setVerified(false);
  }, [setVerified]);

  useEffect(() => {
    if (isOtpGenerated) {
      history.push(routes.comeBackLoginVerification);
    }
  }, [history, isOtpGenerated]);

  return (
    <div className={classes.centeredContainer}>
      <SectionTitleWithInfo
        className={classes.title}
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
              <Field
                name="email"
                path="prospect.applicantInfo.email"
                label="Your E-mail Address"
                placeholder="Email"
                component={Input}
                isLoadDefaultValueFromStore={false}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />

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
                    !values.email || !values.mobileNo || (isRecaptchaEnable && !recaptchaToken)
                  }
                  justify="flex-end"
                  label="Next step"
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
  isRecaptchaEnable: getIsRecaptchaEnable(state)
});

const mapDispatchToProps = {
  generateOtpCode,
  setToken,
  setVerified
};

export const ComeBackLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComeBackLoginComponent);
