import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";
import { useHistory } from "react-router-dom";

import { OtpVerification } from "../../components/OtpVerification";
import { SectionTitleWithInfo } from "../SectionTitleWithInfo";
import { ErrorMessage } from "../../components/Notifications";
import { SubmitButton } from "../../components/Buttons/SubmitButton";

import { UAE_CODE } from "../../constants";

import { useStyles } from "./styled";

export const MAX_ATTEMPT_ALLOWED = 3;

export const OTPformComponent = ({
  otp,
  inputParam,
  redirectRoute,
  verifyOtp,
  generateOtpCode
}) => {
  const history = useHistory();

  const [code, setCode] = useState(Array(6).fill(""));
  const [isValidCode, setIsValidCode] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState(0);

  const handleSendNewCodeLinkClick = useCallback(() => {
    if (loginAttempt < MAX_ATTEMPT_ALLOWED) {
      generateOtpCode(inputParam);
    }
    setLoginAttempt(loginAttempt + 1);
  }, [loginAttempt, generateOtpCode, inputParam]);

  const submitForm = useCallback(() => verifyOtp(code.join("")), [verifyOtp, code]);

  const handleSetCode = useCallback(
    ({ isValid, code }) => {
      setIsValidCode(isValid);
      setCode(code);
    },
    [setIsValidCode, setCode]
  );

  const classes = useStyles();

  useEffect(() => {
    if (otp.isVerified) {
      history.push(redirectRoute);
    }
  }, [history, otp]);

  return (
    <div className={classes.centeredContainer}>
      <SectionTitleWithInfo
        title={
          inputParam.countryCode === UAE_CODE
            ? "We have sent you a verification code on registered mobile number"
            : "We have sent you a verification code on registered email address"
        }
        info="Please enter the six digits below, to confirm this is you"
      />

      <Formik initialValues={code} onSubmit={submitForm}>
        {() => (
          <Form>
            <div>
              <Grid container item xs={12} direction="row" justify="flex-start">
                <OtpVerification code={code} onChange={handleSetCode} />
              </Grid>

              {otp.verificationError && (
                <ErrorMessage
                  classes={{ error: classes.error }}
                  error="Code verification failed."
                />
              )}

              {loginAttempt > MAX_ATTEMPT_ALLOWED && (
                <ErrorMessage
                  classes={{ error: classes.error }}
                  error="You have exceeded your maximum attempt. Please come back later and try again."
                />
              )}

              <span>
                Didn’t get the code?{" "}
                <span
                  onClick={handleSendNewCodeLinkClick}
                  className={cx(classes.link, {
                    [classes.linkDisabled]: loginAttempt >= MAX_ATTEMPT_ALLOWED
                  })}
                >
                  Send a new code
                </span>
              </span>
            </div>
            {/*TODO linkContainer move to classes*/}
            <div className="linkContainer">
              <SubmitButton
                disabled={!isValidCode || otp.isPending}
                justify="flex-end"
                label={otp.isPending ? "Verify..." : "Next Step"}
                //TODO move out inline styles
                containerExtraStyles={{ width: "auto", margin: 0 }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
