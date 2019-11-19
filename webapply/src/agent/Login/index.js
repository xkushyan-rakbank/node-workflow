import React, { useCallback } from "react";
import { connect } from "react-redux";
import TextInput from "../../components/InputField/TextInput";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { loginInfoForm } from "../../store/actions/loginForm";
import * as inputSelectors from "../../store/selectors/input";
import * as appConfigSelector from "../../store/selectors/appConfig";
import { useStyles } from "./styled";

const Login = ({ userName, password, loginInfoForm, inputParam }) => {
  const classes = useStyles();
  // const { userName, password, loginInfoForm, inputParam } = props;
  const submitForm = useCallback(
    event => {
      event.preventDefault();
      loginInfoForm(inputParam);
    },
    [loginInfoForm, inputParam]
  );

  return (
    <div className={classes.baseForm}>
      <h2>Login</h2>

      <form noValidate onSubmit={submitForm}>
        <TextInput id="login.userName" />

        <TextInput id="login.password" type="password" />

        <div className="linkContainer">
          <SubmitButton label="Next Step" justify="flex-end" disabled={!password || !userName} />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  userName: inputSelectors.getInputValueById(state, "login.userName"),
  password: inputSelectors.getInputValueById(state, "login.password"),
  inputParam: appConfigSelector.getLoginParam(state)
});
const mapDispatchToProps = {
  loginInfoForm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
