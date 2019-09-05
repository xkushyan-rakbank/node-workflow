import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ErrorBoundary from "../components/ErrorBoundary";
import TextInput from "../components/InputField/TextInput";
import ReCaptcha from "../components/ReCaptcha/ReCaptcha";
import RefactoredCheckbox from "../components/InputField/RefactoredCheckbox";
import SubmitButton from "../components/Buttons/SubmitButton";
import PureSelect from "../components/InputField/PureSelect";
import validateForm from "../utils/validate";
import { history } from "../store/configureStore";

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

class BasicsForm extends React.Component {
  submitForm = event => {
    event.preventDefault();
    const errorList = validateForm(event);

    if (!errorList.length) {
      history.push("/VerifyOTP");
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.baseForm}>
        <h2>Let’s Start with the Basics</h2>
        <p className="formDescription">
          We know from experience users may get scared when asked for details.
          We need a trust-creating message, to explain why we need them
          (autosave and finish at a later stage)
        </p>

        <form noValidate onSubmit={this.submitForm}>
          <TextInput id="Aplnt.fullName" />

          <TextInput id="Aplnt.email" />

          <TextInput
            id="Aplnt.mobileNo"
            selectId="Aplnt.countryCode"
            select={
              <PureSelect
                id="Aplnt.countryCode"
                combinedSelect
                defaultValue="USA"
              />
            }
          />

          <RefactoredCheckbox id="Aplnt.applyOnbehalf" />

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

const mapStateToProps = state => {
  const config = state.appConfig || {};
  return {
    config
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
)(BasicsForm);
