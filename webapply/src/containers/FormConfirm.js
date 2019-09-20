import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Input from "./../components/InputField/Input";
import SubmitButton from "../components/Buttons/SubmitButton";
import BackLink from "../components/Buttons/BackLink";
import { withStyles } from "@material-ui/core/styles";
import { digitRegExp } from "../constants";
import ErrorMessage from "../components/ErrorMessage";
import { generateOtpCode, verifyOtp } from "../store/actions/otp";
import { getInputServerValidityByPath } from "../store/selectors/serverValidation";
import { getOtp } from "../store/selectors/otp";
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
      isRegenerateCodeAllow: true
    };
    this.inputRefs = [];
    this.regenerateCodeDelay = 10 * 1000;
  }

  componentWillUnmount() {
    clearTimeout(this.resetRegenerateCodeAllowTimeoutId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.otp.isVerified && this.props.otp.isVerified) {
      this.props.history.push("/CompanyInfo");
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

  isCodeValueValid() {
    return this.state.code.every(value => digitRegExp.test(value));
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.isCodeValueValid()) {
      this.props.verifyOtp(this.getFullCode());
    } else {
      this.setState({ invalid: true });
    }
  };

  jumpToNextInput(name) {
    const index = Number(name);
    this.inputRefs[index] && this.inputRefs[index].blur();
    this.inputRefs[index + 1] && this.inputRefs[index + 1].focus();
  }

  handleChange = event => {
    const { value, name } = event.target;
    const newValue = value.trim();
    const newState = { invalid: false };
    if (digitRegExp.test(value) || (this.state.code[name] && !newValue)) {
      const newCode = this.state.code;
      newCode[name] = newValue;
      newState.code = newCode;
      if (newValue) {
        this.jumpToNextInput(name);
      }
    }
    this.setState({ ...newState });
  };

  bindNodeRef = index => node => {
    this.inputRefs[index] = node;
  };

  handleInputFocus = index => () => {
    this.inputRefs[index] && this.inputRefs[index].select();
  };

  handleSendNewCodeLinkClick = () => {
    if (!this.state.isRegenerateCodeAllow) {
      return;
    }
    this.setState({ isRegenerateCodeAllow: false });
    this.props.generateOtpCode();
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <h2>Confirm It’s You</h2>
        <p className={classes.formDescription}>
          We have sent you a verification code. Please input the six digits
          below, to cofirm this is you.
        </p>
        <form noValidate onSubmit={this.handleSubmit}>
          <Grid container item xs={12} direction="row" justify="flex-start">
            {this.state.code.map((value, index) => {
              return (
                <Grid key={index} className={classes.squareInput}>
                  <Input
                    name={index.toString()}
                    inputProps={{
                      autoComplete: "off",
                      maxLength: 1,
                      ref: this.bindNodeRef(index)
                    }}
                    onFocus={this.handleInputFocus(index)}
                    onChange={this.handleChange}
                    value={value}
                  />
                </Grid>
              );
            })}
          </Grid>
          {this.state.invalid && <ErrorMessage error="Invalid code" />}
          {this.props.otp.verificationError && (
            <ErrorMessage error="Code verification failed" />
          )}
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
            <div className="linkContainer">
              <BackLink path={routes.applicantInfo} />

              <SubmitButton
                disabled={!this.isCodeValueValid() || this.props.otp.isPending}
                label={this.props.otp.isPending ? "Verify..." : "Next Step"}
                justify="flex-end"
              />
            </div>
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
  )
});

const mapDispatchToProps = {
  generateOtpCode,
  verifyOtp
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FormConfirm)
);
