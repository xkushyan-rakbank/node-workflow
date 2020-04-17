import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { generateOtpCode, verifyOtp, verifyClearError } from "../../store/actions/otp";
import { getOtp } from "../../store/selectors/otp";
import { getApplicantInfo } from "../../store/selectors/appConfig";
import { useTrackingHistory } from "../../utils/useTrackingHistory";

import { MAX_ATTEMPT_ALLOWED } from "./constants";
import { Form } from "./components/Form";

export const Otp = ({ redirectRoute }) => {
  const dispatch = useDispatch();
  const { attempts, verificationError, isVerified, isPending, isGenerating } = useSelector(getOtp);
  const applicantInfo = useSelector(getApplicantInfo);
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

  useEffect(() => () => dispatch(verifyClearError()), [dispatch]);

  const handleSendNewCodeLinkClick = useCallback(() => {
    resetOtpForm();
    if (!isGenerating) {
      /* istanbul ignore else */
      if (loginAttempt < MAX_ATTEMPT_ALLOWED) {
        dispatch(generateOtpCode(applicantInfo));
      }
      setLoginAttempt(loginAttempt + 1);
    }
  }, [isGenerating, loginAttempt, dispatch, applicantInfo, resetOtpForm]);

  const submitForm = useCallback(() => dispatch(verifyOtp(code.join(""))), [dispatch, code]);

  return (
    <Form
      applicantInfo={applicantInfo}
      attempts={attempts}
      loginAttempt={loginAttempt}
      isPending={isPending}
      isGenerating={isGenerating}
      verificationError={verificationError}
      otpRef={otpRef}
      code={code}
      setCode={setCode}
      handleSendNewCodeLinkClick={handleSendNewCodeLinkClick}
      submitForm={submitForm}
    />
  );
};
