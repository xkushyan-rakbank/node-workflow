import React from "react";
import { connect } from "react-redux";
import SubmitButton from "../components/Buttons/SubmitButton";
import BackLink from "../components/Buttons/BackLink";
import PureSelect from "../components/InputField/PureSelect";
import TextInput from "../components/InputField/TextInput";
import { applicantInfoForm } from "../store/actions/applicantInfoForm";
import { setToken, setVerified } from "../store/actions/reCaptcha";
import { generateOtpCode } from "../store/actions/otp";
import { receiveAppConfig, updateActionType } from "./../store/actions/appConfig";
import * as appConfigSelectors from "../store/selectors/appConfig";
import * as otpSelectors from "../store/selectors/otp";
import * as inputSelectors from "../store/selectors/input";
import { validateForm } from "../utils/validate";
import routes from "../routes";
import httpClient from "./../api/axiosConfig";
import getBaseURL from "./../utils/getBaseURL";

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.otp.isGenerated && this.props.otp.isGenerated) {
      this.props.history.push(routes.verifyOtp);
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

  render() {
    const { lastInputValue } = this.props;

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

          <div className="linkContainer">
            <BackLink path={routes.detailedAccount} />

            <SubmitButton label="Next Step" justify="flex-end" disabled={!lastInputValue} />
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  prospectId: appConfigSelectors.getProspectId(state),
  otp: otpSelectors.getOtp(state),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicsForm);
