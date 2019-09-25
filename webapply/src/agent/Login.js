import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ErrorBoundary from "../components/ErrorBoundary";
import TextInput from "../components/InputField/TextInput";
import ReCaptcha from "../components/ReCaptcha/ReCaptcha";
import SubmitButton from "../components/Buttons/SubmitButton";
import validateForm from "../utils/validate";

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

          <TextInput id="login.password" type="password" />

          <ErrorBoundary className={classes.reCaptchaContainer}>
            <ReCaptcha
              onVerify={token =>
                // see implementation ReCaptcha handling in webapply/src/containers/ApplicantInfo.js
                console.log("ReCaptcha onVerify callback:", token)
              }
              onExpired={() =>
                console.log("ReCaptcha onExpired callback (2 min)")
              }
              onError={() => console.log("ReCaptcha onError callback")}
            />
          </ErrorBoundary>

          <SubmitButton label="Next Step" justify="flex-end" />
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
