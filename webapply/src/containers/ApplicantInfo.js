import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import SubmitButton from "../components/Buttons/SubmitButton";
import BackLink from "../components/Buttons/BackLink";
import ErrorBoundary from "../components/ErrorBoundary";
import PureSelect from "../components/InputField/PureSelect";
import TextInput from "../components/InputField/TextInput";
import ReCaptcha from "../components/ReCaptcha/ReCaptcha";
import { applicantInfoForm } from "../store/actions/applicantInfoForm";
import { setToken, setVerified } from "../store/actions/reCaptcha";
import { generateOtpCode } from "../store/actions/otp";
import { receiveAppConfig, updateActionType } from "./../store/actions/appConfig";
import * as reCaptchaSelectors from "../store/selectors/reCaptcha";
import * as appConfigSelectors from "../store/selectors/appConfig";
import * as otpSelectors from "../store/selectors/otp";
import * as inputSelectors from "../store/selectors/input";
import validateForm from "../utils/validate";
import routes from "../routes";
import httpClient from "./../api/axiosConfig";
import getBaseURL from "./../utils/getBaseURL";

const styles = {
  reCaptchaContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  reCaptchaErrorContainer: {
    position: "relative"
  },
  reCaptchaError: {
    position: "absolute",
    bottom: "0",
    fontSize: "12px",
    color: "#ea2b1e"
  }
};

class BasicsForm extends React.Component {
  static defaultProps = {
    setToken: () => {}
  };

  componentDidMount() {
    if (!this.props.prospectId) {
      httpClient.defaults.baseURL = getBaseURL();

      this.props.receiveAppConfig();
    }
  }

  submitForm = event => {
    event.preventDefault();
    const errorList = validateForm(event);
    if (!errorList.length) {
      this.props.updateActionType("save");
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
    const { classes, lastInputValue, reCaptchaToken, reCaptchaErrors } = this.props;
    console.log(reCaptchaErrors);
    return (
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
            select={<PureSelect id="Aplnt.countryCode" combinedSelect defaultValue="971" />}
          />

          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.reCaptchaErrorContainer}
          >
            <ErrorBoundary className={classes.reCaptchaContainer}>
              <ReCaptcha
                onVerify={this.handleReCaptchaVerify}
                onExpired={this.handleReCaptchaExpired}
                onError={this.handleReCaptchaError}
              />
            </ErrorBoundary>
            {reCaptchaErrors &&
              reCaptchaErrors.map((error, index) => (
                <div key={index} className={classes.reCaptchaError}>
                  {error.message}
                </div>
              ))}

            <div className="linkContainer">
              <BackLink path={routes.detailedAccount} />

              <SubmitButton
                label="Next Step"
                justify="flex-end"
                disabled={!lastInputValue || !reCaptchaToken}
              />
            </div>
          </Grid>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  prospectId: appConfigSelectors.getProspectId(state),
  otp: otpSelectors.getOtp(state),
  reCaptchaToken: reCaptchaSelectors.getReCaptchaToken(state),
  reCaptchaErrors: reCaptchaSelectors.getReCaptchaError(state),
  lastInputValue: inputSelectors.getInputValueById(state, "Aplnt.mobileNo"),
  isProceed: appConfigSelectors.getProceedStatus(state),
  serverError: appConfigSelectors.getServerErrorStatus(state),
  screeningResults: appConfigSelectors.getScreeningResults(state),
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
});

const mapDispatchToProps = {
  generateOtpCode,
  setToken,
  setVerified,
  applicantInfoForm,
  updateActionType,
  receiveAppConfig
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BasicsForm)
);
