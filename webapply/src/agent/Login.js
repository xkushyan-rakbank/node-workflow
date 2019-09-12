import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ErrorBoundary from "../components/ErrorBoundary";
import TextInput from "../components/InputField/TextInput";
import ReCaptcha from "../components/ReCaptcha/ReCaptcha";
import SubmitButton from "../components/Buttons/SubmitButton";
import validateForm from "../utils/validate";
import Password from "../components/InputField/Password";

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
  submitForm = event => {
    event.preventDefault();
    const errorList = validateForm(event);

    if (!errorList.length) {
      this.props.history.push("/SearchProspect");
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.baseForm}>
        <h2>Login</h2>

        <form noValidate onSubmit={this.submitForm}>
          <TextInput id="login.userName" />

          <Password id="login.password" />

          <ErrorBoundary className={classes.reCaptchaContainer}>
            <ReCaptcha
              onVerify={token =>
                console.log("ReCaptcha onVerify callback:", token)
              }
              onExpired={() =>
                console.log("ReCaptcha onExpired callback (2 min)")
              }
              onError={() => console.log("ReCaptcha onError callback")}
            />
          </ErrorBoundary>

          <SubmitButton />
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
