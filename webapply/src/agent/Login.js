import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ErrorBoundary from "../components/ErrorBoundary";
import TextInput from "../components/InputField/TextInput";
import ReCaptcha from "../components/ReCaptcha/ReCaptcha";
import SubmitButton from "../components/Buttons/SubmitButton";
// import validateForm from "../utils/validate";
import { setToken, setVerified, verifyToken } from "../store/actions/reCaptcha";
import * as reCaptchaSelectors from "../store/selectors/reCaptcha";
import { loginInfoForm } from "../store/actions/loginForm";
import * as inputSelectors from "../store/selectors/input";
import * as appConfigSelector from "../store/selectors/appConfig";

const styles = {
  baseForm: {
    maxWidth: "612px"
  },
  reCaptchaContainer: {
    display: "flex",
    paddingTop: "10px",
    justifyContent: "flex-end"
  }
};

class Login extends React.Component {
  static defaultProps = {
    setToken: () => {}
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.reCaptchaToken !== this.props.reCaptchaToken && this.props.reCaptchaToken) {
      this.props.verifyToken();
    }
  }
  submitForm = event => {
    event.preventDefault();
    this.props.loginInfoForm(this.props.inputParam);
  };

  handleReCaptchaVerify = token => {
    this.props.setToken(token);
  };

  handleReCaptchaExpired = () => {
    this.props.setVerified(false);
  };

  handleReCaptchaError = error => {
    console.error(error);
    this.props.setVerified(false);
  };

  render() {
    const { classes, reCaptchaToken, userName, password } = this.props;
    return (
      <div className={classes.baseForm}>
        <h2>Login</h2>

        <form noValidate onSubmit={this.submitForm}>
          <TextInput id="login.userName" />

          <TextInput id="login.password" type="password" />

          <Grid container direction="row" justify="space-between" alignItems="center">
            <ErrorBoundary className={classes.reCaptchaContainer}>
              <ReCaptcha
                onVerify={this.handleReCaptchaVerify}
                onExpired={this.handleReCaptchaExpired}
                onError={this.handleReCaptchaError}
              />
            </ErrorBoundary>
            <div className="linkContainer">
              <SubmitButton
                label="Next Step"
                justify="flex-end"
                disabled={!password || !userName || !reCaptchaToken}
              />
            </div>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reCaptchaToken: reCaptchaSelectors.getReCaptchaToken(state),
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
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
