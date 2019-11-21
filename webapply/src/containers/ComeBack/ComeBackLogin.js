import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, CustomSelect, InputGroup } from "./../../components/Form";
import { EMAIL_REGEX, PHONE_REGEX } from "./../../utils/validation";
import { prospect } from "./../../constants/config";
import { countryCodeOptions } from "./../../constants/options";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import SubmitButton from "../../components/Buttons/SubmitButton";
import ReCaptcha from "../../components/ReCaptcha/ReCaptcha";
import ErrorBoundary from "../../components/ErrorBoundary";
import { setToken, setVerified } from "../../store/actions/reCaptcha";
import { generateOtpCode } from "../../store/actions/comeBackLogin";
import { isOtpGenerated } from "../../store/selectors/comeBackLogin";
import routes from "./../../routes";
import { IS_RECAPTCHA_ENABLE } from "../../constants";
import { useStyles } from "./styled";

const ComeBackLogin = ({
  history,
  generateOtpCode,
  isOtpGenerated,
  setToken = () => {},
  setVerified
}) => {
  const classes = useStyles();

  const submitForm = values => generateOtpCode(values);

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

  const ComebackSchema = Yup.object({
    email: Yup.string()
      .required("You need to provide Email address")
      .matches(EMAIL_REGEX, "This is not a valid Email address"),
    countryCode: Yup.string().required("Select country code"),
    mobileNo: Yup.string()
      .required("You need to provide mobile number")
      .matches(PHONE_REGEX, "This is not a valid phone")
  });

  return (
    <div className={classes.centeredContainer}>
      <SectionTitleWithInfo
        title="Wondering about your application? You came to the right place."
        info="Please enter the login you used when you first applied"
      />
      <Formik
        initialValues={prospect.applicantInfo}
        validationSchema={ComebackSchema}
        onSubmit={submitForm}
      >
        {() => (
          <Form>
            <Field name="email" label="Your E-mail Address" placeholder="Email" component={Input} />

            <InputGroup>
              <Field
                name="countryCode"
                options={countryCodeOptions}
                component={CustomSelect}
                extractId={option => option.key}
                shrink={false}
              />

              <Field
                name="mobileNo"
                label="Your Mobile Number"
                placeholder="Mobile Number"
                component={Input}
              />
            </InputGroup>

            {IS_RECAPTCHA_ENABLE && (
              <ErrorBoundary className={classes.reCaptchaContainer}>
                <ReCaptcha
                  onVerify={handleReCaptchaVerify}
                  onExpired={handleVerifiedFailed}
                  onError={handleVerifiedFailed}
                />
              </ErrorBoundary>
            )}

            <div className="linkContainer">
              <SubmitButton justify="flex-end" label="Next" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => ({
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
