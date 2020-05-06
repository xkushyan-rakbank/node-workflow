import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Input, AutoSaveField as Field } from "../../../../components/Form";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { USER_NAME_REGEX, PASSWORD_REGEX } from "../../../../utils/validation";
import { getInvalidMessage, getRequiredMessage } from "../../../../utils/getValidationMessage";

import { useStyles } from "./styled";

const loginSchema = Yup.object({
  username: Yup.string()
    .required(getRequiredMessage("User name"))
    .matches(USER_NAME_REGEX, getInvalidMessage("User name")),
  password: Yup.string()
    .required(getRequiredMessage("Password"))
    .matches(PASSWORD_REGEX, getInvalidMessage("Password"))
});

export const LoginComponent = ({ submitForm, isLoading }) => {
  const classes = useStyles();

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
              label="Your Password"
              placeholder="Your Password"
              onPaste={e => e.preventDefault()}
              component={Input}
              InputProps={{
                inputProps: { tabIndex: 0 }
              }}
            />
            <div className="linkContainer">
              <SubmitButton
                justify="flex-end"
                label="Next Step"
                disabled={Object.values(values).some(value => !value) || isLoading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
