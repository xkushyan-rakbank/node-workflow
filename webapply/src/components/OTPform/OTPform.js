import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";
import { useHistory } from "react-router-dom";

import { UAE_CODE } from "../../constants";

import { ErrorMessage } from "../../components/Notifications";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { OtpVerification } from "../../components/OtpVerification";
import { SectionTitleWithInfo } from "../SectionTitleWithInfo";

import { useStyles } from "./styled";

export const MAX_ATTEMPT_ALLOWED = 3;

export const OTPformComponent = ({
  otp,
  verifyOtp,
  verifyClearError,
  applicantInfo,
  redirectRoute,
  generateOtpCode,
  infoTitleResult,
  classes: extendetClasses
}) => {
  const history = useHistory();

  const [code, setCode] = useState(Array(6).fill(""));
  const [isValidCode, setIsValidCode] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState(0);

  useEffect(() => {
    if (otp.isVerified) {
      history.push(redirectRoute);
    }
    // eslint-disable-next-line
  }, [otp.isVerified]);

  useEffect(() => {
    if (otp.verificationError) {
      setCode(Array(6).fill(""));
    }
    // eslint-disable-next-line
  }, [otp.verificationError]);

  useEffect(() => () => verifyClearError(), []);

  const handleSendNewCodeLinkClick = useCallback(() => {
    if (loginAttempt < MAX_ATTEMPT_ALLOWED) {
      generateOtpCode(applicantInfo);
    }
    setLoginAttempt(loginAttempt + 1);
  }, [loginAttempt, generateOtpCode, applicantInfo]);

  const submitForm = useCallback(() => verifyOtp(code.join("")), [verifyOtp, code]);

  const handleSetCode = useCallback(
    ({ isValid, code }) => {
      setIsValidCode(isValid);
      setCode(code);
    },
    [setIsValidCode, setCode]
  );

  const getTitle = () => {
    if (infoTitleResult) return;
    return applicantInfo.countryCode === UAE_CODE
      ? "We have sent you a verification code on registered mobile number"
      : "We have sent you a verification code on registered email address";
  };

  const classes = useStyles({ classes: extendetClasses });

  return (
    <div className={classes.centeredContainer}>
      <SectionTitleWithInfo
        classes={{ title: classes.title }}
        title={getTitle()}
        info={
          infoTitleResult
            ? infoTitleResult
            : "Please enter the six digits below, to confirm this is you"
        }
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

            <div className={classes.linkContainer}>
              <SubmitButton
                disabled={!isValidCode || otp.isPending}
                justify="flex-end"
                label={otp.isPending ? "Verify..." : "Next Step"}
                submitButtonClassName={classes.submitButton}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
