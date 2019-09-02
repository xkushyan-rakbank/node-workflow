import React from "react";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ErrorBoundary from "../components/ErrorBoundary";
import TextInput from "../components/InputField/TextInput";
import ReCaptcha from "../components/ReCaptcha/ReCaptcha";
import CombinedSelect from "../components/InputField/CombinedSelect";
import PureSelect from "../components/InputField/PureSelect";
import RefactoredCheckbox from "../components/InputField/RefactoredCheckbox";
import SubmitButton from "../components/Buttons/SubmitButton";
import routes from "./../routes"; // remove it in future
import { appInfoFormSubmit } from "./../store/actions/ApplicationInfoSubmit"; // remove it in future

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
  handleSubmit = event => {
    event.preventDefault();
    const isValid = event.target.checkValidity();
    console.log(event.target.elements);
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

        <form onSubmit={this.handleSubmit} noValidate>
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
          <div className="linkContainer">
            <SubmitButton disabled={false} />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  appInfoFormSubmit
};

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps
  )
)(BasicsForm);
