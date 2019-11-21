import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";

import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import TextInput from "../../components/InputField/TextInput";
import PureSelect from "../../components/InputField/PureSelect";
import TextHelpWithLink from "../../components/TextHelpWithLink";
import SubmitButton from "../../components/Buttons/SubmitButton";
import ReCaptcha from "../../components/ReCaptcha/ReCaptcha";
import ErrorBoundary from "../../components/ErrorBoundary";
import { setToken, setVerified } from "../../store/actions/reCaptcha";
import { generateOtpCode } from "../../store/actions/otp";
import { getReCaptchaToken } from "../../store/selectors/reCaptcha";
import { isOtpGenerated } from "../../store/selectors/otp";
import { getInputValueById } from "../../store/selectors/input";
import routes from "./../../routes";
import { IS_RECAPTCHA_ENABLE } from "../../constants";
import { useStyles } from "./styled";

const ComeBackLogin = ({
  history,
  email,
  mobileNo,
  countryCode,
  generateOtpCode,
  isOtpGenerated,
  setToken = () => {},
  setVerified
}) => {
  const classes = useStyles();
  const submitForm = useCallback(
    event => {
      event.preventDefault();
      generateOtpCode();
    },
    [generateOtpCode]
  );
  const handleReCaptchaVerify = useCallback(
    token => {
      setToken(token);
    },
    [setToken]
  );
  const handleVerifiedFailed = useCallback(() => {
    setVerified(false);
  }, [setVerified]);

  useEffect(() => {
    if (isOtpGenerated) {
      history.push(routes.comeBackLoginVerification);
    }
  }, [history, isOtpGenerated]);

  return (
    <div className={classes.centeredContainer}>
      <SectionTitleWithInfo
        title="Wondering about your application? You came to the right place."
        info="Please enter the login you used when you first applied"
      />

      <form noValidate onSubmit={submitForm} className={classes.form}>
        <div>
          <TextInput id="Aplnt.email" />
          <TextInput
            id="Aplnt.mobileNo"
            selectId="Aplnt.countryCode"
            select={<PureSelect id="Aplnt.countryCode" combinedSelect defaultValue="UAE" />}
          />

          <TextHelpWithLink text="Can’t remember your login?" linkText="Chat with us" linkTo="#" />
        </div>

        {IS_RECAPTCHA_ENABLE && (
          <ErrorBoundary className={classes.reCaptchaContainer}>
            <ReCaptcha
              onVerify={handleReCaptchaVerify}
              onExpired={handleVerifiedFailed}
              onError={handleVerifiedFailed}
            />
          </ErrorBoundary>
        )}

        <SubmitButton
          label="Next"
          justify="flex-end"
          disabled={!email || !countryCode || !mobileNo}
        />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  isOtpGenerated: isOtpGenerated(state),
  reCaptchaToken: getReCaptchaToken(state),
  email: getInputValueById(state, "Aplnt.email"),
  mobileNo: getInputValueById(state, "Aplnt.mobileNo"),
  countryCode: getInputValueById(state, "Aplnt.countryCode")
});

const mapDispatchToProps = {
  generateOtpCode,
  setToken,
  setVerified
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComeBackLogin);
