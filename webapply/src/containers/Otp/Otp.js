import React, { useState, useCallback, useEffect, useRef } from "react";

import { Form } from "./components/Form";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { UAE_CODE, digitRegExp } from "../../constants";

export const MAX_ATTEMPT_ALLOWED = 3;
export const MAX_NUMBER_VALIDATION_ERRORS = 4;
export const INITIAL_VALUES = Array(6).fill("");

export const OtpContainer = ({
  applicantInfo,
  otp,
  verifyOtp,
  verifyClearError,
  redirectRoute,
  generateOtpCode,
  classes
}) => {
  const { attempts, verificationError, isVerified, isPending, isGenerating } = otp;
  const pushHistory = useTrackingHistory();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [loginAttempt, setLoginAttempt] = useState(0);

  const formRef = useRef(null);

  const resetFormValues = useCallback(() => {
    setValues(INITIAL_VALUES);
    formRef.current.resetFocus();
  }, [setValues]);

  useEffect(() => {
    if (isVerified) {
      pushHistory(redirectRoute, true);
    }
  }, [isVerified, pushHistory, redirectRoute]);

  useEffect(() => {
    if (verificationError) {
      resetFormValues();
    }
  }, [verificationError, resetFormValues]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => verifyClearError(), []);

  const handleSendNewCodeLinkClick = useCallback(() => {
    resetFormValues();
    if (isGenerating) return;
    if (loginAttempt < MAX_ATTEMPT_ALLOWED) {
      generateOtpCode(applicantInfo);
    }
    setLoginAttempt(loginAttempt + 1);
  }, [isGenerating, loginAttempt, generateOtpCode, applicantInfo, resetFormValues]);

  const handleSubmit = useCallback(() => verifyOtp(values.join("")), [verifyOtp, values]);

  const isValid = values.every(value => digitRegExp.test(value));
  const isSubmitButtonDisable = !isValid || isPending || isGenerating;

  const hasMaxAttemptsError =
    loginAttempt > MAX_ATTEMPT_ALLOWED || attempts >= MAX_NUMBER_VALIDATION_ERRORS;

  const hasVerifyError = !hasMaxAttemptsError && verificationError;

  const hasUAECode = applicantInfo.countryCode === UAE_CODE;

  return (
    <Form
      classes={classes}
      formRef={formRef}
      values={values}
      isPending={isPending}
      isSubmitButtonDisable={isSubmitButtonDisable}
      hasUAECode={hasUAECode}
      hasMaxAttemptsError={hasMaxAttemptsError}
      hasVerifyError={hasVerifyError}
      onChange={setValues}
      onSubmit={handleSubmit}
      onSendNewCode={handleSendNewCodeLinkClick}
    />
  );
};
