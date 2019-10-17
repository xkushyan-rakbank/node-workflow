import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import cx from "classnames";
import ContainerComeBack from "./ContainerComeBack";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import arrowBackIc from "../../assets/icons/backArrow.png";
import SubmitButton from "../../components/Buttons/SubmitButton";
import OtpVerification from "../../components/OtpVerification";
import ErrorMessage from "../../components/ErrorMessage";
import { generateOtpCode, verifyOtp } from "../../store/actions/otp";
import { getInputServerValidityByPath } from "../../store/selectors/serverValidation";
import { getOtp } from "../../store/selectors/otp";
import { getApplicantInfo } from "../../store/selectors/appConfig";
import { getInputNameById } from "../../store/selectors/input";
import routes from "../../routes";

const style = {
  form: {
    width: "100%",
    height: 450,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media only screen and (max-height: 768px)": {
      height: 390
    }
  },
  goBackContainer: {
    marginRight: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  goBackArrow: {
    marginRight: 5,
    "& img": {
      marginRight: 5
    }
  },
  goBack: {
    color: "#373737",
    lineHeight: "1.29",
    fontWeight: "600",
    textDecoration: "underline",
    fontSize: "14px",
    "&:hover": {
      textDecoration: "none"
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

const verificationMsg = {
  UAE: {
    title: "We have sent you a verification code on registered mobile number"
  },
  NonUAE: {
    title: "We have sent you a verification code on registered email address"
  }
};

class ComeBackVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: Array(6).fill(""),
      invalid: false,
      isValidCode: false,
      isRegenerateCodeAllow: true,
      loginAttempt: 0
    };
    this.regenerateCodeDelay = 1 * 1000;
  }

  componentWillUnmount() {
    clearTimeout(this.resetRegenerateCodeAllowTimeoutId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.otp.isVerified && this.props.otp.isVerified) {
      this.props.history.push("/MyApplications");
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

  handleSendNewCodeLinkClick = () => {
    this.setState({ loginAttempt: this.state.loginAttempt + 1 });
    console.log("attempt", this.state.loginAttempt);
    if (!this.state.isRegenerateCodeAllow) {
      return;
    }
    this.setState({ isRegenerateCodeAllow: false, isValidCode: false });
    if (this.state.loginAttempt < 3) {
      this.props.generateOtpCode();
    }
  };

  submitForm = e => {
    e.preventDefault();
    // if (this.isCodeValueValid()) {
    this.props.verifyOtp(this.getFullCode());
    // } else {
    // TODO handle incorrect input code from server
    //   this.setState({ invalid: true });
    // }
  };

  isCodeValueValid = ({ isValid, code }) => {
    this.setState({ isValidCode: isValid, code });
  };

  render() {
    const { classes, inputParam } = this.props;

    let title = "";
    inputParam.countryCode === "UAE"
      ? (title = verificationMsg["UAE"].title)
      : (title = verificationMsg["NonUAE"].title);

    return (
      <ContainerComeBack>
        <SectionTitleWithInfo
          title={title}
          info="Please enter the six digits below, to confirm this is you"
        />

        <form noValidate onSubmit={this.submitForm} className={classes.form}>
          <div>
            <Grid container item xs={12} direction="row">
              <OtpVerification onChange={this.isCodeValueValid} />
            </Grid>
            {this.state.invalid && <ErrorMessage error="Invalid code" />}
            {this.props.otp.verificationError && <ErrorMessage error="Code verification failed" />}
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
          {this.state.loginAttempt > 3 && (
            <ErrorMessage error="You have exceeded your maximum attempt. Please come back later and try again" />
          )}
          <Grid
            container
            direction="row"
            className={classes.actions}
            alignItems="center"
            justify="flex-end"
          >
            <div className={classes.goBackContainer}>
              <img src={arrowBackIc} alt="step to back" />
              <Link to={routes.comeBackLogin}>
                <Typography element="span" variant="subtitle1" classes={{ root: classes.goBack }}>
                  Go back
                </Typography>
              </Link>
            </div>

            <SubmitButton
              disabled={!this.state.isValidCode || this.props.otp.isPending}
              label="Next Step"
              justify="flex-end"
              containerExtraStyles={{ width: "auto", margin: 0 }}
            />
          </Grid>
        </form>
      </ContainerComeBack>
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
  inputParam: getApplicantInfo(state)
});

const mapDispatchToProps = {
  generateOtpCode,
  verifyOtp
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ComeBackVerification)
);
