import React, { useState, useCallback, useEffect, useRef } from "react";
import { Formik, Form as FormikForm } from "formik";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";

import { UAE_CODE, digitRegExp } from "../../../../constants";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";
import { ErrorMessage } from "../../../../components/Notifications";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import { Input } from "../Input";

import { useStyles } from "./styled";

export const MAX_ATTEMPT_ALLOWED = 3;
export const MAX_NUMBER_VALIDATION_ERRORS = 4;

export const Form = ({
  otp,
  verifyOtp,
  verifyClearError,
  applicantInfo,
  redirectRoute,
  generateOtpCode,
  classes: extendedClasses
}) => {
  const { attempts, verificationError, isVerified, isPending, isGenerating } = otp;
  const classes = useStyles({ classes: extendedClasses });
  const pushHistory = useTrackingHistory();

  const [code, setCode] = useState(Array(6).fill(""));
  const [loginAttempt, setLoginAttempt] = useState(0);

  const otpRef = useRef(null);

  const resetOtpForm = useCallback(() => {
    setCode(Array(6).fill(""));
    otpRef.current.resetFocus();
  }, [setCode]);

  useEffect(() => {
    if (isVerified) {
      pushHistory(redirectRoute, true);
    }
  }, [isVerified, pushHistory, redirectRoute]);

  useEffect(() => {
    if (verificationError) {
      resetOtpForm();
    }
  }, [verificationError, resetOtpForm]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => verifyClearError(), []);

  const handleSendNewCodeLinkClick = useCallback(() => {
    resetOtpForm();
    if (isGenerating) return;
    if (loginAttempt < MAX_ATTEMPT_ALLOWED) {
      generateOtpCode(applicantInfo);
    }
    setLoginAttempt(loginAttempt + 1);
  }, [isGenerating, loginAttempt, generateOtpCode, applicantInfo, resetOtpForm]);

  const submitForm = useCallback(() => verifyOtp(code.join("")), [verifyOtp, code]);

  const isValid = code.every(value => digitRegExp.test(value));
  const hasMaxAttemptsError =
    loginAttempt > MAX_ATTEMPT_ALLOWED || attempts >= MAX_NUMBER_VALIDATION_ERRORS;

  return (
    <div className={classes.centeredContainer}>
      <SectionTitleWithInfo
        className={classes.title}
        title={`We have sent you a verification code on your ${
          applicantInfo.countryCode === UAE_CODE ? "mobile number" : "e-mail address"
        }`}
        info="Please enter the six digits below, to confirm this is you"
      />

      <Formik initialValues={code} onSubmit={submitForm}>
        {() => (
          <FormikForm className={classes.form}>
            <div>
              <Grid container item xs={12} direction="row" justify="flex-start">
                <Input code={code} onChange={setCode} ref={otpRef} />
              </Grid>

              {!hasMaxAttemptsError && verificationError && (
                <ErrorMessage
                  classes={{ error: classes.error }}
                  error="Code verification failed."
                />
              )}
              {hasMaxAttemptsError && (
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
                    [classes.linkDisabled]: hasMaxAttemptsError
                  })}
                >
                  Send a new code
                </span>
              </span>
            </div>

            <div className={classes.linkContainer}>
              <SubmitButton
                disabled={!isValid || isPending || isGenerating}
                justify="flex-end"
                label={isPending ? "Verify..." : "Next Step"}
                submitButtonClassName={classes.submitButton}
              />
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};
