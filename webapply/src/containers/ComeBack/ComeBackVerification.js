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
import { history } from "./../../store/configureStore";
import { useStyles } from "./styled";
import { titles, errorMsgs, MAX_ATTEMPT_ALLOWED } from "./constants";

const ComeBackVerification = ({ inputParam, generateOtpCode, verifyOtp, otp }) => {
  const classes = useStyles();

  const [code, setCode] = useState(Array(6).fill(""));
  const [isValidCode, setIsValidCode] = useState(false);
  const [isRegenerateCodeAllow, setIsRegenerateCodeAllow] = useState(true);
  const [loginAttempt, setLoginAttempt] = useState(0);

  useEffect(() => {
    if (otp.isVerified) {
      history.push(routes.MyApplications);
    }
  }, [otp]);

  const getFullCode = () => {
    return code.join("");
  };

  const handleSendNewCodeLinkClick = useCallback(() => {
    const newLoginAttempt = loginAttempt + 1;
    setLoginAttempt(newLoginAttempt);
    if (loginAttempt < MAX_ATTEMPT_ALLOWED) {
      generateOtpCode();
    } else {
      setIsRegenerateCodeAllow(false);
    }
  }, [loginAttempt, generateOtpCode]);

  const submitForm = e => {
    e.preventDefault();
    verifyOtp(getFullCode());
  };

  const isCodeValueValid = ({ isValid, code }) => {
    setIsValidCode(isValid);
    setCode(code);
  };

  let title = "";
  inputParam.countryCode === "UAE"
    ? (title = titles.UAE_VERIFICATION_MESSAGE)
    : (title = titles.NON_UAE_VERIFICATION_MESSAGE);

  return (
    <div className={classes.centeredContainer}>
      <SectionTitleWithInfo title={title} info={titles.SUB_TITLE} />

      <form noValidate onSubmit={submitForm} className={classes.verificationForm}>
        <div>
          <Grid container item xs={12} direction="row" justify="flex-start">
            <OtpVerification onChange={isCodeValueValid} />
          </Grid>
          {otp.verificationError && <ErrorMessage error={errorMsgs.VERIFICATION_ERROR} />}
          {loginAttempt > MAX_ATTEMPT_ALLOWED && (
            <ErrorMessage error={errorMsgs.LOGIN_ATTEMPT_ERROR} />
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
