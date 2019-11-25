import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input, AutoSaveField as Field } from "./../../components/Form";
import { NAME_REGEX } from "./../../utils/validation";
import { agentSection } from "./../../constants/config";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { loginInfoForm } from "../../store/actions/loginForm";
import * as inputSelectors from "../../store/selectors/input";
import { useStyles } from "./styled";

const loginSchema = Yup.object({
  userName: Yup.string()
    .required("You need to provide username")
    .matches(NAME_REGEX, "This is not a valid username"),
  password: Yup.string()
    .required("You need to provide password")
    .matches(NAME_REGEX, "This is not a valid password")
});

const Login = ({ userName, password, loginInfoForm }) => {
  const classes = useStyles();
  const submitForm = useCallback(values => loginInfoForm(values), [loginInfoForm]);

  return (
    <div className={classes.baseForm}>
      <h2>Login</h2>
      <Formik
        initialValues={agentSection.login}
        validationSchema={loginSchema}
        onSubmit={submitForm}
      >
        {() => (
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
                disabled={!password || !userName}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => ({
  userName: inputSelectors.getInputValueById(state, "login.userName"),
  password: inputSelectors.getInputValueById(state, "login.password")
});
const mapDispatchToProps = {
  loginInfoForm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
