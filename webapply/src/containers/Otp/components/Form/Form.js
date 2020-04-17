import React from "react";
import { Formik, Form as FormikForm } from "formik";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";

import { UAE_CODE, digitRegExp } from "../../../../constants";
import { ErrorMessage } from "../../../../components/Notifications";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import { Input } from "../Input";
import { MAX_NUMBER_VALIDATION_ERRORS, MAX_ATTEMPT_ALLOWED } from "../../constants";

import { useStyles } from "./styled";

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
  classes: extendedClasses
}) => {
  const classes = useStyles({ classes: extendedClasses });

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
