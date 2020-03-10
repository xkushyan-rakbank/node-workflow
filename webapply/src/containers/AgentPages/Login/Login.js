import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Input, AutoSaveField as Field } from "../../../components/Form";
import { USER_NAME_REGEX, PASSWORD_REGEX } from "../../../utils/validation";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { getInvalidMessage, getRequiredMessage } from "../../../utils/getValidationMessage";

import { useStyles } from "./styled";
import routes from "../../../routes";
import { useFormNavigation } from "../../../components/FormNavigation/FormNavigationProvider";

const loginSchema = Yup.object({
  username: Yup.string()
    .required(getRequiredMessage("User name"))
    .matches(USER_NAME_REGEX, getInvalidMessage("User name")),
  password: Yup.string()
    .required(getRequiredMessage("Password"))
    .matches(PASSWORD_REGEX, getInvalidMessage("Password"))
});

export const LoginComponent = ({ login, setIsApplyEditApplication, history }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const submitForm = useCallback(
    values => {
      let loginData = { ...values };
      setIsLoading(true);
      login(loginData).then(
        () => {
          setIsApplyEditApplication(true);
          setIsLoading(false);
          history.push(routes.searchProspect);
        },
        () => {
          setIsLoading(false);
        }
      );
    },
    [login, history, setIsApplyEditApplication]
  );

  useFormNavigation([true, false]);

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
