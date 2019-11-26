import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input, CustomSelect, InputGroup, AutoSaveField as Field } from "./../../components/Form";
import { EMAIL_REGEX, PHONE_REGEX } from "./../../utils/validation";
import { prospect } from "./../../constants/config";
import { countryCodeOptions } from "./../../constants/options";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import ReCaptcha from "../../components/ReCaptcha/ReCaptcha";
import ErrorBoundary from "../../components/ErrorBoundary";
import { setToken, setVerified } from "../../store/actions/reCaptcha";
import { generateOtpCode } from "../../store/actions/otp";
import { isOtpGenerated } from "../../store/selectors/otp";
import routes from "./../../routes";
import { IS_RECAPTCHA_ENABLE } from "../../constants";
import { useStyles } from "./styled";

const comebackSchema = Yup.object({
  email: Yup.string()
    .required("You need to provide Email address")
    .matches(EMAIL_REGEX, "This is not a valid Email address"),
  countryCode: Yup.string().required("Select country code"),
  mobileNo: Yup.string()
    .required("You need to provide mobile number")
    .matches(PHONE_REGEX, "This is not a valid phone")
});

const ComeBackLogin = ({
  history,
  generateOtpCode,
  isOtpGenerated,
  setToken,
  setVerified,
  reCaptchaToken
}) => {
  const classes = useStyles();
  const submitForm = useCallback(
    values => {
      generateOtpCode(values);
    },
    [generateOtpCode]
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
        title="Wondering about your application? You came to the right place."
        info="Please enter the login you used when you first applied"
      />
      <Formik
        initialValues={prospect.applicantInfo}
        validationSchema={comebackSchema}
        onSubmit={submitForm}
      >
        {({ values }) => (
          <Form>
            <Field
              name="email"
              path="prospect.applicantInfo.email"
              label="Your E-mail Address"
              placeholder="Email"
              component={Input}
            />

            <InputGroup>
              <Field
                name="countryCode"
                path="prospect.applicantInfo.countryCode"
                options={countryCodeOptions}
                component={CustomSelect}
                extractId={option => option.key}
                shrink={false}
              />

              <Field
                name="mobileNo"
                path="prospect.applicantInfo.mobileNo"
                label="Your Mobile Number"
                placeholder="Mobile Number"
                component={Input}
              />
            </InputGroup>

            {IS_RECAPTCHA_ENABLE && (
              <ErrorBoundary>
                <ReCaptcha
                  onVerify={handleReCaptchaVerify}
                  onExpired={handleVerifiedFailed}
                  onError={handleVerifiedFailed}
                />
              </ErrorBoundary>
            )}

            <div className="linkContainer">
              <SubmitButton
                disabled={
                  !values.email || !values.mobileNo || (IS_RECAPTCHA_ENABLE && !reCaptchaToken)
                }
                justify="flex-end"
                label="Next"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => ({
  reCaptchaToken: state.reCaptcha.token,
  isOtpGenerated: isOtpGenerated(state)
});

const mapDispatchToProps = {
  generateOtpCode,
  setToken,
  setVerified
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComeBackLogin);
