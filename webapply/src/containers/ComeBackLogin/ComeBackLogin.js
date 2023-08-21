import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { ComeBackLoginComponent } from "./components/ComeBackLogin";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "./../../routes";
//ro-assist header missing issue fix
import { useLayoutParams } from "../FormLayout";
import { OtpChannel, UAE_CODE } from "../../constants";
import { setOtpMode } from "../../store/actions/otp";
import { logout } from "../../store/actions/loginForm";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);

  useEffect(() => {
    resetProspect();
  }, [resetProspect]);

  const submitForm = useCallback(
    values => {
      let loginData = { ...values };
      loginData.action = "generate";
      loginData.mode = values.countryCode === UAE_CODE ? OtpChannel.Sms : OtpChannel.Email;
      if (isRecaptchaEnable) {
        loginData.recaptchaToken = recaptchaToken;
      }
      return generateOtpCode(loginData).then(
        () => {
          if (values.countryCode === UAE_CODE) {
            dispatch(setOtpMode(OtpChannel.Sms));
          } else {
            dispatch(setOtpMode(OtpChannel.Email));
          }
          pushHistory(
            /* istanbul ignore next */
            process.env.REACT_APP_OTP_ENABLE === "N"
              ? routes.MyApplications
              : routes.comeBackLoginVerification,
            true
          );
        },
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
