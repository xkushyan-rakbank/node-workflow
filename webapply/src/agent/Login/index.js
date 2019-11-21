import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextInput from "../../components/InputField/TextInput";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { loginInfoForm } from "../../store/actions/loginForm";
import * as inputSelectors from "../../store/selectors/input";
import * as appConfigSelector from "../../store/selectors/appConfig";
import { styles } from "./styled";
import { titles } from "./constants";

class Login extends React.Component {
  submitForm = event => {
    event.preventDefault();
    this.props.loginInfoForm(this.props.inputParam);
  };

  render() {
    const { classes, userName, password } = this.props;
    return (
      <div className={classes.baseForm}>
        <h2>{titles.LOGIN_TITLE}</h2>

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
  loginInfoForm
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
