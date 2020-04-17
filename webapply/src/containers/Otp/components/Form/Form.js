import React from "react";
import { Formik, Form as FormikForm } from "formik";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";

import { ErrorMessage } from "../../../../components/Notifications";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import { Input } from "../Input";

import { useStyles } from "./styled";

export const MAX_ATTEMPT_ALLOWED = 3;
export const MAX_NUMBER_VALIDATION_ERRORS = 4;

export const Form = ({
  formRef,
  values,
  isPending,
  isSubmitButtonDisable,
  hasUAECode,
  hasMaxAttemptsError,
  hasVerifyError,
  onChange,
  onSubmit,
  onSendNewCode,
  classes: extendedClasses
}) => {
  const classes = useStyles({ classes: extendedClasses });

  return (
    <div className={classes.centeredContainer}>
      <SectionTitleWithInfo
        className={classes.title}
        title={`We have sent you a verification code on your ${
          hasUAECode ? "mobile number" : "e-mail address"
        }`}
        info="Please enter the six digits below, to confirm this is you"
      />

      <Formik initialValues={values} onSubmit={onSubmit}>
        {() => (
          <FormikForm className={classes.form}>
            <div>
              <Grid container item xs={12} direction="row" justify="flex-start">
                <Input code={values} onChange={onChange} ref={formRef} />
              </Grid>

              {hasVerifyError && (
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
                  onClick={onSendNewCode}
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
                disabled={isSubmitButtonDisable}
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
