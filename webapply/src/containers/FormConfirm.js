import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import SubmitButton from "../components/Buttons/SubmitButton";
import BackLink from "../components/Buttons/BackLink";
import OtpVerification from "../components/OtpVerification";
import { withStyles } from "@material-ui/core/styles";
import ErrorMessage from "../components/ErrorMessage";
import { displayScreenBasedOnViewId } from "../store/actions/appConfig";
import { generateOtpCode, verifyOtp } from "../store/actions/otp";
import { getInputServerValidityByPath } from "../store/selectors/serverValidation";
import { getOtp } from "../store/selectors/otp";
import { getApplicationInfo } from "../store/selectors/appConfig";
import { getInputNameById } from "../store/selectors/input";
import routes from "../routes";

const style = {
  confirmForm: {
    maxWidth: "780px",
    width: "100%"
  },
  formDescription: {
    fontSize: "20px",
    color: "#373737",
    margin: "0px 0 18px",
    "& b": {
      fontWeight: "600"
    }
  },
  squareInput: {
    marginRight: "16px",
    "& div": {
      width: "88px",
      height: "88px",
      boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.01)",
      fontSize: "30px"
    },
    "& input": {
      textAlign: "center"
    }
  },
  link: {
    textDecoration: "underline",
    cursor: "pointer"
  },
  linkDisabled: {
    opacity: "0.5",
    cursor: "not-allowed"
  }
};

class FormConfirm extends React.Component {
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

  componentWillUnmount() {
    clearTimeout(this.resetRegenerateCodeAllowTimeoutId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.otp.isVerified && this.props.otp.isVerified) {
      if (this.props.applicationInfo.retrieveMode) {
        this.props.displayScreenBasedOnViewId();
      } else {
        this.props.history.push("/CompanyInfo");
      }
    }

    if (prevState.isRegenerateCodeAllow && !this.state.isRegenerateCodeAllow) {
      this.resetRegenerateCodeAllowTimeoutId = setTimeout(
        () => this.setState({ isRegenerateCodeAllow: true }),
        this.regenerateCodeDelay
      );
    }
  }

  getFullCode() {
    return this.state.code.join("");
  }

  isCodeValueValid = ({ isValid, code }) => {
    this.setState({
      isValidCode: isValid,
      code
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // if (this.isCodeValueValid()) {
    this.props.verifyOtp(this.getFullCode());
    // } else {
    // TODO handle incorrect input code from server
    //   this.setState({ invalid: true });
    // }
  };

  handleSendNewCodeLinkClick = () => {
    if (!this.state.isRegenerateCodeAllow) {
      return;
    }
    this.setState({ isRegenerateCodeAllow: false, isValidCode: false });
    this.props.generateOtpCode();
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <h2>Confirm It’s You</h2>
        <p className={classes.formDescription}>
          We have sent you a verification code. Please input the six digits below, to cofirm this is
          you.
        </p>
        <form noValidate onSubmit={this.handleSubmit}>
          <Grid container item xs={12} direction="row" justify="flex-start">
            <OtpVerification onChange={this.isCodeValueValid} />
          </Grid>
          {this.state.invalid && <ErrorMessage error="Invalid code" />}
          {this.props.otp.verificationError && <ErrorMessage error="Code verification failed" />}
          <div className="flexContainerForButton">
            <span>
              Didn’t get the code?{" "}
              <span
                onClick={this.handleSendNewCodeLinkClick}
                className={cx(classes.link, {
                  [classes.linkDisabled]: !this.state.isRegenerateCodeAllow
                })}
              >
                Send a new code
              </span>
            </span>
          </div>
          <div className="linkContainer">
            <BackLink path={routes.applicantInfo} />

            <SubmitButton
              disabled={!this.state.isValidCode || this.props.otp.isPending}
              label={this.props.otp.isPending ? "Verify..." : "Next Step"}
              justify="flex-end"
            />
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  otp: getOtp(state),
  mobileServerValidation: getInputServerValidityByPath(
    state,
    getInputNameById(state, "Aplnt.mobileNo")
  ),
  emailServerValidation: getInputServerValidityByPath(
    state,
    getInputNameById(state, "Aplnt.email")
  ),
  applicationInfo: getApplicationInfo(state)
});

const mapDispatchToProps = {
  generateOtpCode,
  verifyOtp,
  displayScreenBasedOnViewId
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FormConfirm)
);
