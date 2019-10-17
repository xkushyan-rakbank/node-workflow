import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ContainerComeBack from "./ContainerComeBack";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import TextInput from "../../components/InputField/TextInput";
import PureSelect from "../../components/InputField/PureSelect";
import TextHelpWithLink from "../../components/TextHelpWithLink";
import SubmitButton from "../../components/Buttons/SubmitButton";
import ReCaptcha from "../../components/ReCaptcha/ReCaptcha";
import ErrorBoundary from "../../components/ErrorBoundary";
import { setToken, setVerified, verifyToken } from "../../store/actions/reCaptcha";
import { generateOtpCode } from "../../store/actions/otp";
import * as reCaptchaSelectors from "../../store/selectors/reCaptcha";
import * as otpSelectors from "../../store/selectors/otp";
import * as inputSelectors from "../../store/selectors/input";
import routes from "./../../routes";

const styles = {
  form: {
    width: "100%",
    height: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media only screen and (max-height: 768px)": {
      height: 350
    }
  },
  reCaptchaContainer: {
    display: "flex",
    paddingTop: "10px",
    justifyContent: "flex-end"
  }
};

class ComeBackLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: Array(6).fill(""),
      invalid: false,
      isValidCode: false,
      isRegenerateCodeAllow: true
    };
    this.regenerateCodeDelay = 10 * 1000;
  }

  static defaultProps = {
    setToken: () => {}
  };

  submitForm = event => {
    event.preventDefault();
    this.props.generateOtpCode();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.otp.isGenerated && this.props.otp.isGenerated) {
      this.props.history.push(routes.comeBackLoginVerification);
    }
    if (prevProps.reCaptchaToken !== this.props.reCaptchaToken && this.props.reCaptchaToken) {
      this.props.verifyToken();
    }
    // if (prevState.isRegenerateCodeAllow && !this.state.isRegenerateCodeAllow) {
    //   this.resetRegenerateCodeAllowTimeoutId = setTimeout(
    //     () => this.setState({ isRegenerateCodeAllow: true }),
    //     this.regenerateCodeDelay
    //   );
    // }
  }

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
    const { classes, email, mobileNo, countryCode, isReCaptchaVerified } = this.props;
    return (
      <ContainerComeBack>
        <SectionTitleWithInfo
          title="Wondering about your application? You came to the right place."
          info="Please enter the login you used when you first applied"
        />

        <form noValidate onSubmit={this.submitForm} className={classes.form}>
          <div>
            <TextInput id="Aplnt.email" />
            <TextInput
              id="Aplnt.mobileNo"
              selectId="Aplnt.countryCode"
              select={<PureSelect id="Aplnt.countryCode" combinedSelect defaultValue="UAE" />}
            />

            <TextHelpWithLink
              text="Can’t remember your login?"
              linkText="Chat with us"
              linkTo="#"
            />
          </div>

          <ErrorBoundary className={classes.reCaptchaContainer}>
            <ReCaptcha
              onVerify={this.handleReCaptchaVerify}
              onExpired={this.handleReCaptchaExpired}
              onError={this.handleReCaptchaError}
            />
          </ErrorBoundary>

          <SubmitButton
            label="Next"
            justify="flex-end"
            disabled={!email || !countryCode || !mobileNo || !isReCaptchaVerified}
          />
        </form>
      </ContainerComeBack>
    );
  }
}

const mapStateToProps = state => ({
  otp: otpSelectors.getOtp(state),
  reCaptchaToken: reCaptchaSelectors.getReCaptchaToken(state),
  email: inputSelectors.getInputValueById(state, "Aplnt.email"),
  mobileNo: inputSelectors.getInputValueById(state, "Aplnt.mobileNo"),
  countryCode: inputSelectors.getInputValueById(state, "Aplnt.countryCode"),
  isReCaptchaVerified: reCaptchaSelectors.getReCaptchaVerified(state)
  //inputParam: appConfigSelector.getApplicationInfo(state)
});

const mapDispatchToProps = {
  generateOtpCode,
  setToken,
  setVerified,
  verifyToken
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ComeBackLogin)
);
