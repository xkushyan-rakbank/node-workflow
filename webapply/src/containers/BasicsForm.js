import React from "react";
import { Fromik } from "formik";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ErrorBoundary from "../components/ErrorBoundary";
import TextInput from "../components/InputField/TextInput";
import ReCaptcha from "../components/ReCaptcha/ReCaptcha";
import RefactoredCheckbox from "../components/InputField/RefactoredCheckbox";
import SubmitButton from "../components/Buttons/SubmitButton";
import routes from "./../routes"; // remove it in future
import validate from "./../utils/validate";

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
    const fields = event.target.elements;
    const fieldsConfig = this.props.config.uiConfig;
    const errorList = [];
    for (let i = 0; i < fields.length; i++) {
      const id = fields[i].getAttribute("id");
      const error = validate(fields[i], fieldsConfig[id]);
      if (error) {
        errorList.push(error);
      }
      fields[i].focus();
    }

    if (!errorList.length) {
      this.props.history.push("/VerifyOTP");
    }
  };

  render() {
    const { classes, config } = this.props;

    return (
      <div className={classes.baseForm}>
        <h2>Let’s Start with the Basics</h2>
        <p className="formDescription">
          We know from experience users may get scared when asked for details.
          We need a trust-creating message, to explain why we need them
          (autosave and finish at a later stage)
        </p>

        <form noValidate onSubmit={this.submitForm}>
          <TextInput id="UI0001" />

          <TextInput id="UI0002" />

          <TextInput id="UI0004" selectId="UI0003" withSelect />

          <RefactoredCheckbox id="UI0004_1" />

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
