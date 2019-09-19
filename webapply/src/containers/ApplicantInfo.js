import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import store from "../store/configureStore";
import get from "lodash/get";
import ErrorBoundary from "../components/ErrorBoundary";
import TextInput from "../components/InputField/TextInput";
import ReCaptcha from "../components/ReCaptcha/ReCaptcha";
import RefactoredCheckbox from "../components/InputField/RefactoredCheckbox";
import SubmitButton from "../components/Buttons/SubmitButton";
import PureSelect from "../components/InputField/PureSelect";
import { setToken, verifyToken, setVerified } from "../store/actions/reCaptcha";
import { applicantInfoForm } from "../store/actions/applicantInfoForm";
import validateForm from "../utils/validate";
import * as reCaptchaSelectors from "../store/selectors/reCaptcha";

const styles = {
  reCaptchaContainer: {
    display: "flex",
    paddingTop: "10px",
    justifyContent: "flex-end"
  }
};

class BasicsForm extends React.Component {
  static defaultProps = {
    setToken: () => {}
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.reCaptchaToken !== this.props.reCaptchaToken &&
      this.props.reCaptchaToken
    ) {
      this.props.verifyToken();
    }
  }

  submitForm = (event, values) => {
    event.preventDefault();
    const errorList = validateForm(event);

    // this.props.history.push("/VerifyOTP");

    if (!errorList.length) {
      const data = get(store.getState(), "appConfig.prospect");
      this.props.applicantInfoForm(data);
    }
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
    const { classes } = this.props;
    return (
      <>
        <h2>Let’s Start with the Basics</h2>
        <p className="formDescription">
          First things first, you need a login, so you can come back to your
          application later.
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

          <PureSelect id="Aplnt.applyOnbehalf" />

          <ErrorBoundary className={classes.reCaptchaContainer}>
            <ReCaptcha
              onVerify={this.handleReCaptchaVerify}
              onExpired={this.handleReCaptchaExpired}
              onError={this.handleReCaptchaError}
            />
          </ErrorBoundary>

          <SubmitButton label="Next Step" justify="flex-end" />
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  reCaptchaToken: reCaptchaSelectors.getReCaptchaToken(state),
  isReCaptchaVerified: reCaptchaSelectors.getReCaptchaVerified(state)
});

const mapDispatchToProps = {
  setToken,
  setVerified,
  verifyToken,
  applicantInfoForm
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BasicsForm)
);
