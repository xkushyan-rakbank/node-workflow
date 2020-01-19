import React, { useCallback, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";

import { Input, AutoSaveField as Field } from "../../../components/Form";
import { USER_NAME_REGEX, PASSWORD_REGEX } from "../../../utils/validation";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { ErrorBoundaryForReCaptcha } from "../../../components/ErrorBoundary";
import ReCaptcha from "../../../components/ReCaptcha/ReCaptcha";
import { IS_RECAPTCHA_ENABLE } from "../../../constants";

import { useStyles } from "./styled";

const loginSchema = Yup.object({
  username: Yup.string()
    .required("You need to provide username")
    .matches(USER_NAME_REGEX, "This is not a valid username"),
  password: Yup.string()
    .required("You need to provide password")
    .matches(PASSWORD_REGEX, "This is not a valid password")
});

export const LoginComponent = ({
  loginInfoForm,
  setToken,
  setVerified,
  verifyToken,
  recaptchaToken
}) => {
  const classes = useStyles();
  const submitForm = useCallback(
    values => {
      let loginData = { ...values };

      if (IS_RECAPTCHA_ENABLE) {
        loginData.recaptchaToken = recaptchaToken;
      }

      loginInfoForm(loginData);
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
        validateOnChange={false}
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
              InputProps={{
                inputProps: { tabIndex: 0 }
              }}
            />

            <Field
              name="password"
              type="password"
              path="login.password"
              label="Your Password"
              placeholder="Your Password"
              onPaste={e => e.preventDefault()}
              component={Input}
              InputProps={{
                inputProps: { tabIndex: 0 }
              }}
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
