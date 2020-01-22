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

export const MAX_ATTEMPT_ALLOWED = 4;
export const MAX_NUMBER_VALIDATION_ERRORS = 5;

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
  const { attempts, verificationError, isVerified, isPending } = otp;
  const [code, setCode] = useState(Array(6).fill(""));
  const [isValidCode, setIsValidCode] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [isDisplayMaxAttempError, setIsDisplayMaxAttempError] = useState(false);

  useEffect(() => {
    if (isVerified) {
      history.push(redirectRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerified]);

  useEffect(() => {
    if (verificationError) {
      setCode(Array(6).fill(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationError]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => verifyClearError(), []);

  const handleSendNewCodeLinkClick = useCallback(() => {
    if (loginAttempt < MAX_ATTEMPT_ALLOWED) {
      generateOtpCode(applicantInfo);
    }
    if (attempts >= MAX_NUMBER_VALIDATION_ERRORS) {
      setIsDisplayMaxAttempError(true);
    }
    setLoginAttempt(loginAttempt + 1);
  }, [loginAttempt, generateOtpCode, applicantInfo, attempts]);

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
      ? "We have sent you a verification code on your mobile number"
      : "We have sent you a verification code on your e-mail address";
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
            : "Please input the six digits below, to confirm this is you"
        }
      />

      <Formik initialValues={code} onSubmit={submitForm}>
        {() => (
          <Form>
            <div>
              <Grid container item xs={12} direction="row" justify="flex-start">
                <OtpVerification code={code} onChange={handleSetCode} />
              </Grid>

              {!isDisplayMaxAttempError && verificationError && (
                <ErrorMessage
                  classes={{ error: classes.error }}
                  error="Code verification failed."
                />
              )}
              {(loginAttempt > MAX_ATTEMPT_ALLOWED || isDisplayMaxAttempError) && (
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
                    [classes.linkDisabled]:
                      loginAttempt >= MAX_ATTEMPT_ALLOWED ||
                      attempts >= MAX_NUMBER_VALIDATION_ERRORS
                  })}
                >
                  Send a new code
                </span>
              </span>
            </div>

            <div className={classes.linkContainer}>
              <SubmitButton
                disabled={!isValidCode || isPending}
                justify="flex-end"
                label={isPending ? "Verify..." : "Next Step"}
                submitButtonClassName={classes.submitButton}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
