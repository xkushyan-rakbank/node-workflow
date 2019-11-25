import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input, AutoSaveField as Field } from "./../../components/Form";
import { NAME_REGEX } from "./../../utils/validation";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { loginInfoForm } from "../../store/actions/loginForm";
import { useStyles } from "./styled";

const loginSchema = Yup.object({
  userName: Yup.string()
    .required("You need to provide username")
    .matches(NAME_REGEX, "This is not a valid username"),
  password: Yup.string()
    .required("You need to provide password")
    .matches(NAME_REGEX, "This is not a valid password")
});

const LoginPage = ({ loginInfoForm }) => {
  const classes = useStyles();
  const submitForm = useCallback(values => loginInfoForm(values), [loginInfoForm]);

  return (
    <div className={classes.baseForm}>
      <h2>Login</h2>
      <Formik
        initialValues={{ userName: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={submitForm}
      >
        {({ values }) => (
          <Form>
            <Field
              name="userName"
              path="login.userName"
              label="UserName"
              placeholder="UserName"
              component={Input}
            />

            <Field
              name="password"
              type="password"
              path="login.password"
              label="Your Password"
              placeholder="Your Password"
              component={Input}
            />

            <div className="linkContainer">
              <SubmitButton
                justify="flex-end"
                label="Next Step"
                disabled={Object.keys(values).some(key => !values[key])}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  loginInfoForm
};

export const Login = connect(
  null,
  mapDispatchToProps
)(LoginPage);
