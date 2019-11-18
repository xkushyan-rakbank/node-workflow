import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import SubmitButton from "../../components/Buttons/SubmitButton";
import OtpVerification from "../../components/OtpVerification";
import ErrorMessage from "../../components/ErrorMessage";
import { generateOtpCode, verifyOtp } from "../../store/actions/otp";
import { getInputServerValidityByPath } from "../../store/selectors/serverValidation";
import { getOtp } from "../../store/selectors/otp";
import { getApplicantInfo } from "../../store/selectors/appConfig";
import { getInputNameById } from "../../store/selectors/input";
import routes from "../../routes";
import { useStyles } from "./styled";
import { COUNTRY_CODE, MAX_ATTEMPT_ALLOWED } from "./constants";

const ComeBackVerification = ({ inputParam, generateOtpCode, verifyOtp, otp, history }) => {
  const classes = useStyles();

  const [code, setCode] = useState(Array(6).fill(""));
  const [isValidCode, setIsValidCode] = useState(false);
  const [isRegenerateCodeAllow, setIsRegenerateCodeAllow] = useState(true);
  const [loginAttempt, setLoginAttempt] = useState(0);

  useEffect(() => {
    if (otp.isVerified) {
      history.push(routes.MyApplications);
    }
  }, [history, otp]);

  const handleSendNewCodeLinkClick = useCallback(() => {
    const newLoginAttempt = loginAttempt + 1;
    setLoginAttempt(newLoginAttempt);
    if (loginAttempt < MAX_ATTEMPT_ALLOWED) {
      generateOtpCode();
    } else {
      setIsRegenerateCodeAllow(false);
    }
  }, [loginAttempt, generateOtpCode]);

  const submitForm = useCallback(
    e => {
      e.preventDefault();
      verifyOtp(code.join(""));
    },
    [verifyOtp, code]
  );

  const isCodeValueValid = useCallback(
    ({ isValid, code }) => {
      setIsValidCode(isValid);
      setCode(code);
    },
    [setIsValidCode, setCode]
  );

  let title = "";
  inputParam.countryCode === COUNTRY_CODE
    ? (title = "We have sent you a verification code on registered mobile number")
    : (title = "We have sent you a verification code on registered email address");

  return (
    <div className={classes.centeredContainer}>
      <SectionTitleWithInfo
        title={title}
        info="Please enter the six digits below, to confirm this is you"
      />

      <form noValidate onSubmit={submitForm} className={classes.verificationForm}>
        <div>
          <Grid container item xs={12} direction="row" justify="flex-start">
            <OtpVerification onChange={isCodeValueValid} />
          </Grid>
          {otp.verificationError && <ErrorMessage error="Code verification failed" />}
          {loginAttempt > MAX_ATTEMPT_ALLOWED && (
            <ErrorMessage error="You have exceeded your maximum attempt. Please come back later and try again." />
          )}
          <span>
            Didn’t get the code?
            <span
              onClick={handleSendNewCodeLinkClick}
              className={cx(classes.link, {
                [classes.linkDisabled]: !isRegenerateCodeAllow
              })}
            >
              Send a new code
            </span>
          </span>
        </div>

        <SubmitButton
          disabled={!isValidCode || otp.isPending}
          label="Next Step"
          justify="flex-end"
          containerExtraStyles={{ width: "auto", margin: 0 }}
        />
      </form>
    </div>
  );
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComeBackVerification);
