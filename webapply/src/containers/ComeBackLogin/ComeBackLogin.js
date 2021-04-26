import React, { useEffect, useCallback } from "react";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { ComeBackLoginComponent } from "./components/ComeBackLogin";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "./../../routes";
//ro-assist header missing issue fix
import { useLayoutParams } from "../FormLayout";

export const ComeBackLoginContainer = ({
  generateOtpCode,
  setToken,
  resetProspect,
  recaptchaToken,
  reCaptchaSiteKey,
  isRecaptchaEnable,
  isGenerating,
  isConfigLoading
}) => {
  const pushHistory = useTrackingHistory();
  useFormNavigation([true, false]);
  useLayoutParams();

  useEffect(() => {
    resetProspect();
  }, [resetProspect]);

  const submitForm = useCallback(
    values => {
      let loginData = { ...values };
      loginData.action = "generate";
      if (isRecaptchaEnable) {
        loginData.recaptchaToken = recaptchaToken;
      }
      return generateOtpCode(loginData).then(
        () =>
          pushHistory(
            /* istanbul ignore next */
            process.env.REACT_APP_OTP_ENABLE === "N"
              ? routes.MyApplications
              : routes.comeBackLoginVerification,
            true
          ),
        () => {}
      );
    },
    [generateOtpCode, recaptchaToken, isRecaptchaEnable, pushHistory]
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

  return (
    <ComeBackLoginComponent
      recaptchaToken={recaptchaToken}
      isRecaptchaEnable={isRecaptchaEnable}
      reCaptchaSiteKey={reCaptchaSiteKey}
      isGenerating={isGenerating}
      isConfigLoading={isConfigLoading}
      submitForm={submitForm}
      handleReCaptchaVerify={handleReCaptchaVerify}
      handleVerifiedFailed={handleVerifiedFailed}
    />
  );
};
