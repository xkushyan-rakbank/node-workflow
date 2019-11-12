import React from "react";
import { connect } from "react-redux";
import TextInput from "../components/InputField/TextInput";
import SubmitButton from "../components/Buttons/SubmitButton";
import { setToken, setVerified, verifyToken } from "../store/actions/reCaptcha";
import { loginInfoForm } from "../store/actions/loginForm";
import * as inputSelectors from "../store/selectors/input";
import * as appConfigSelector from "../store/selectors/appConfig";

class Login extends React.Component {
  static defaultProps = {
    setToken: () => {}
  };

  submitForm = event => {
    event.preventDefault();
    this.props.loginInfoForm(this.props.inputParam);
  };

  render() {
    const { userName, password } = this.props;
    return (
      <div>
        <h2>Login</h2>

        <form noValidate onSubmit={this.submitForm}>
          <TextInput id="login.userName" />

          <TextInput id="login.password" type="password" />

          <div className="linkContainer">
            <SubmitButton label="Next Step" justify="flex-end" disabled={!password || !userName} />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userName: inputSelectors.getInputValueById(state, "login.userName"),
  password: inputSelectors.getInputValueById(state, "login.password"),
  inputParam: appConfigSelector.getLoginParam(state)
});
const mapDispatchToProps = {
  setToken,
  setVerified,
  verifyToken,
  loginInfoForm
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
