import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import SubmitButton from "../components/Buttons/SubmitButton";
import BackLink from "../components/Buttons/BackLink";
import ErrorBoundary from "../components/ErrorBoundary";
import PureSelect from "../components/InputField/PureSelect";
import TextInput from "../components/InputField/TextInput";
// import SearchSelect from "../components/InputField/SearchSelect";
import ReCaptcha from "../components/ReCaptcha/ReCaptcha";
import ApplicationStatus from "../components/ApplicationStatus";
import { applicantInfoForm } from "../store/actions/applicantInfoForm";
import { setToken, setVerified, verifyToken } from "../store/actions/reCaptcha";
import { generateOtpCode } from "../store/actions/otp";
import * as reCaptchaSelectors from "../store/selectors/reCaptcha";
import * as appConfigSelectors from "../store/selectors/appConfig";
import * as otpSelectors from "../store/selectors/otp";
import * as inputSelectors from "../store/selectors/input";
import validateForm from "../utils/validate";
import routes from "../routes";

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
    if (prevProps.reCaptchaToken !== this.props.reCaptchaToken && this.props.reCaptchaToken) {
      this.props.verifyToken();
    }
    // if (
    //   prevProps.prospectId !== this.props.prospectId &&
    //   this.props.prospectId
    // ) {
    //   // its not handle case when user navigate back from next page "OTPVerification"
    //   this.props.generateOtpCode();
    // }
    // if (!prevProps.otp.isGenerated && this.props.otp.isGenerated) {
    //   this.props.history.push(routes.verifyOtp);
    // }
  }

  submitForm = event => {
    event.preventDefault();
    const errorList = validateForm(event);

    if (!errorList.length) {
      this.props.applicantInfoForm();
    }
  };

  handleReCaptchaVerify = token => {
    this.props.setToken(token);
  };

  handleReCaptchaExpired = () => {
    this.props.setVerified(false);
  };

  handleReCaptchaError = error => {
    this.props.setVerified(false);
  };

  render() {
    const { classes, lastInputValue, isProceed, serverError, screeningResults } = this.props;
    return (
      <>
        {isProceed ? (
          <>
            <h2>Let’s Start with the Basics</h2>
            <p className="formDescription">
              First things first, you need a login, so you can come back to your application later.
            </p>

            <form noValidate onSubmit={this.submitForm}>
              <TextInput id="Aplnt.fullName" />

              <TextInput id="Aplnt.email" />

              <TextInput
                id="Aplnt.mobileNo"
                selectId="Aplnt.countryCode"
                select={<PureSelect id="Aplnt.countryCode" combinedSelect defaultValue="USA" />}
              />

              {/* <SearchSelect /> */}

              <ErrorBoundary className={classes.reCaptchaContainer}>
                <ReCaptcha
                  onVerify={this.handleReCaptchaVerify}
                  onExpired={this.handleReCaptchaExpired}
                  onError={this.handleReCaptchaError}
                />
              </ErrorBoundary>

              <div className="linkContainer">
                <BackLink path={routes.detailedAccount} />

                <SubmitButton label="Next Step" justify="flex-end" disabled={!lastInputValue} />
              </div>
            </form>
          </>
        ) : (
          <ApplicationStatus serverError={serverError} errorReason={screeningResults} />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  prospectId: appConfigSelectors.getProspectId(state),
  otp: otpSelectors.getOtp(state),
  reCaptchaToken: reCaptchaSelectors.getReCaptchaToken(state),
  lastInputValue: inputSelectors.getInputValueById(state, "Aplnt.mobileNo"),
  isProceed: appConfigSelectors.getProceedStatus(state),
  serverError: appConfigSelectors.getServerErrorStatus(state),
  screeningResults: appConfigSelectors.getScreeningResults(state),
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
  // isReCaptchaVerified: reCaptchaSelectors.getReCaptchaVerified(state),
});

const mapDispatchToProps = {
  generateOtpCode,
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
