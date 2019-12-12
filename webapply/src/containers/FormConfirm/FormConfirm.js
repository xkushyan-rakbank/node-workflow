import React, { useEffect, useState } from "react";
import cx from "classnames";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { OtpVerification } from "../../components/OtpVerification/index";
import { ErrorMessage } from "../../components/Notifications/index";
import { displayScreenBasedOnViewId, updateSaveType } from "../../store/actions/appConfig";
import { generateOtpCode, verifyOtp } from "../../store/actions/otp";
import { getInputServerValidityByPath } from "../../store/selectors/serverValidation";
import { getOtp } from "../../store/selectors/otp";
import { getApplicationInfo, getApplicantInfo } from "../../store/selectors/appConfig";
import { getInputNameById } from "../../store/selectors/input";
import routes from "../../routes";

import { useStyles } from "./styled";

const FormConfirm = ({ ...props }) => {
  let resetRegenerateCodeAllowTimeoutId = () => {};

  const [code, setCode] = useState(Array(6).fill(""));
  const [invalid, setInvalid] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);
  const [isRegenerateCodeAllow, setRegenerateCodeAllow] = useState(true);
  const [loginAttempt, setLoginAttempt] = useState(0);
  const regenerateCodeDelay = 10 * 1000; // TODO remove

  useEffect(() => {
    return () => {
      clearTimeout(resetRegenerateCodeAllowTimeoutId);
      setLoginAttempt(0);
    };
  }, []);

  useEffect(() => {
    if (props.otp.isVerified) {
      props.updateSaveType("next");
      props.history.push(routes.companyInfo);
    }

    if (isRegenerateCodeAllow) {
      resetRegenerateCodeAllowTimeoutId = setTimeout(
        () => setRegenerateCodeAllow(true),
        regenerateCodeDelay
      );
    }
  }, [props.otp.isVerified, isRegenerateCodeAllow]);

  const getFullCode = () => code.join("");

  const handleSetCode = ({ isValid, code }) => {
    setIsValidCode(isValid);
    setCode(code);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // if (isCodeValueValid()) {
    props.verifyOtp(getFullCode());
    // } else {
    // TODO handle incorrect input code from server
    setInvalid(true);
    // }
  };

  const handleSendNewCodeLinkClick = () => {
    setLoginAttempt(loginAttempt + 1);
    if (isRegenerateCodeAllow) {
      return;
    }
    setRegenerateCodeAllow(false);
    setIsValidCode(false);
    if (loginAttempt < 3) {
      props.generateOtpCode(props.applicantInfo);
    }
  };

  const { applicantInfo } = props;
  const classes = useStyles();
  const codeSentTo = applicantInfo.countryCode === "971" ? "phone" : "email";

  return (
    <>
      <h2>Confirm It’s You</h2>
      <p className={classes.formDescription}>
        We have sent you a verification code to {codeSentTo} . Please input the six digits below, to
        cofirm this is you.
      </p>

      {/*TODO reuse Form*/}
      <form noValidate onSubmit={handleSubmit}>
        <Grid container item xs={12} direction="row" justify="flex-start">
          <OtpVerification code={code} onChange={handleSetCode} />
        </Grid>
        {invalid && <ErrorMessage error="Invalid code" />}
        {props.otp.verificationError && <ErrorMessage error="Code verification failed" />}
        <div className="flexContainerForButton">
          <span>
            Didn’t get the code?{" "}
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
        {loginAttempt > 3 && (
          <ErrorMessage error="You have exceeded your maximum attempt. Please come back later and try again" />
        )}

        <SubmitButton
          disabled={!isValidCode || props.otp.isPending}
          label={props.otp.isPending ? "Verify..." : "Next Step"}
          justify="flex-end"
        />
      </form>
    </>
  );
};
// TODO move out
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
  applicationInfo: getApplicationInfo(state),
  applicantInfo: getApplicantInfo(state)
});
// TODO move out
const mapDispatchToProps = {
  verifyOtp,
  updateSaveType,
  generateOtpCode,
  displayScreenBasedOnViewId
};
// TODO move out
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormConfirm);
