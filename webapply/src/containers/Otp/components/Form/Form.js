import React from "react";
import { Formik, Form as FormikForm } from "formik";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";

import { digitRegExp } from "../../../../constants";
import { ErrorMessage } from "../../../../components/Notifications";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import { Input } from "../Input";
import { MAX_NUMBER_VALIDATION_ERRORS, MAX_ATTEMPT_ALLOWED } from "../../constants";

import { useStyles } from "./styled";
import { Footer } from "../../../../components/Footer";

export const Form = ({
  applicantInfo,
  attempts,
  loginAttempt,
  isPending,
  isGenerating,
  verificationError,
  code,
  otpRef,
  setCode,
  submitForm,
  handleSendNewCodeLinkClick,
  changeText,
  info,
  title,
  classes: extendedClasses,
}) => {
  const classes = useStyles({ classes: extendedClasses });

  const isValid = code.every(value => digitRegExp.test(value));
  const hasMaxAttemptsError =
    loginAttempt > MAX_ATTEMPT_ALLOWED || attempts >= MAX_NUMBER_VALIDATION_ERRORS;

  return (
    <div className={classes.centeredContainer}>
      <SectionTitleWithInfo className={classes.title} title={title} info={info} smallInfo />

      <Formik initialValues={code} onSubmit={submitForm}>
        {() => (
          <FormikForm className={classes.form}>
            <div>
              <Grid container item xs={12} direction="row" alignItems="flex-start">
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

              <div className={classes.resendOtpWrapper}>
                {/* OTP expires in 3:00 mins */}
                {/* <p className={classes.otpExpireMsg}>OTP expires in 3:00 mins</p> */}
                <span
                  onClick={handleSendNewCodeLinkClick}
                  className={cx(classes.link, {
                    [classes.linkDisabled]: hasMaxAttemptsError,
                  })}
                >
                  Resend OTP
                </span>
              </div>
            </div>

            <Footer extraClasses={"oneElement"}>
              <SubmitButton
                disabled={!isValid || isPending || isGenerating}
                justify="flex-end"
                label={"Next"}
                submitButtonClassName={classes.submitButton}
              />
            </Footer>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};
