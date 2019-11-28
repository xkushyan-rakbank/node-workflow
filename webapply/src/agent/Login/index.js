import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";

import { Input, AutoSaveField as Field } from "./../../components/Form";
import { NAME_REGEX } from "./../../utils/validation";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { loginInfoForm } from "../../store/actions/loginForm";
import { setToken, setVerified, verifyToken } from "../../store/actions/reCaptcha";
import { ErrorBoundaryForReCaptcha } from "../../components/ErrorBoundary";
import ReCaptcha from "../../components/ReCaptcha/ReCaptcha";
import { IS_RECAPTCHA_ENABLE } from "../../constants";
import { useStyles } from "./styled";

const loginSchema = Yup.object({
  username: Yup.string()
    .required("You need to provide username")
    .matches(NAME_REGEX, "This is not a valid username"),
  password: Yup.string()
    .required("You need to provide password")
    .matches(NAME_REGEX, "This is not a valid password")
});

const LoginPage = ({ loginInfoForm, setToken, setVerified, verifyToken, recaptchaToken }) => {
  const classes = useStyles();
  const submitForm = useCallback(
    values => {
      loginInfoForm({ ...values, recaptchaToken });
    },
    [loginInfoForm, recaptchaToken]
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
    if (recaptchaToken) {
      verifyToken();
    }
  }, [recaptchaToken, verifyToken]);

  return (
    <div className={classes.baseForm}>
      <h2>Login</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={submitForm}
      >
        {({ values }) => (
          <Form>
            <Field
              name="username"
              path="login.userName"
              label="User Name"
              placeholder="User Name"
              component={Input}
            />

            <Field
              name="password"
              type="password"
              path="login.password"
              label="Your Password"
              placeholder="Your Password"
              onPaste={e => e.preventDefault()}
              component={Input}
            />

            <Grid container direction="row" justify="space-between" alignItems="center">
              <ErrorBoundaryForReCaptcha>
                {IS_RECAPTCHA_ENABLE && (
                  <ReCaptcha
                    onVerify={handleReCaptchaVerify}
                    onExpired={handleVerifiedFailed}
                    onError={handleVerifiedFailed}
                  />
                )}
              </ErrorBoundaryForReCaptcha>
              <div className="linkContainer">
                <SubmitButton
                  justify="flex-end"
                  label="Next Step"
                  disabled={
                    Object.values(values).some(value => !value) ||
                    (IS_RECAPTCHA_ENABLE && !recaptchaToken)
                  }
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
  recaptchaToken: state.reCaptcha.token
});

const mapDispatchToProps = {
  loginInfoForm,
  setToken,
  verifyToken,
  setVerified
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
