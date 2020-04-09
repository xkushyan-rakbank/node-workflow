import React, { useEffect, useCallback } from "react";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { ComeBackLoginComponent } from "./components/ComeBackLogin";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "./../../routes";

export const ComeBackLoginContainer = ({
  generateOtpCode,
  setToken,
  resetProspect,
  recaptchaToken,
  isOtpGenerated,
  isRecaptchaEnable,
  isGenerating,
  isConfigLoading
}) => {
  const pushHistory = useTrackingHistory();
  useFormNavigation([true, false]);

  useEffect(() => {
    resetProspect();
  }, [resetProspect]);

  const submitForm = useCallback(
    values => {
      let loginData = { ...values };

      if (isRecaptchaEnable) {
        loginData.recaptchaToken = recaptchaToken;
      }

      generateOtpCode(loginData);
    },
    [generateOtpCode, recaptchaToken, isRecaptchaEnable]
  );
  const handleReCaptchaVerify = useCallback(
    token => {
      setToken(token);
    },
    [setToken]
  );
  const handleVerifiedFailed = useCallback(() => {
    setToken(null);
  }, [setToken]);

  useEffect(() => {
    if (isOtpGenerated) {
      pushHistory(
        /* istanbul ignore next */
        process.env.REACT_APP_OTP_ENABLE === "N"
          ? routes.MyApplications
          : routes.comeBackLoginVerification,
        true
      );
    }
  }, [pushHistory, isOtpGenerated]);

  return (
    <ComeBackLoginComponent
      recaptchaToken={recaptchaToken}
      isRecaptchaEnable={isRecaptchaEnable}
      isGenerating={isGenerating}
      isConfigLoading={isConfigLoading}
      submitForm={submitForm}
      handleReCaptchaVerify={handleReCaptchaVerify}
      handleVerifiedFailed={handleVerifiedFailed}
    />
  );
};
