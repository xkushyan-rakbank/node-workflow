import React, { useCallback, useEffect, useState } from "react";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { ApplicantInfoComponent } from "./components/ApplicantInfo";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { formStepper } from "../../constants";
import routes from "../../routes";

export const ApplicantInfoContainer = ({
  submit,
  receiveAppConfig,
  setToken,
  reCaptchaToken,
  reCaptchaSiteKey,
  isRecaptchaEnable,
  resetScreeningError,
  isConfigLoading,
  accountType,
  isIslamicBanking
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const pushHistory = useTrackingHistory();
  useFormNavigation([false, false, formStepper]);
  useLayoutParams(true);

  useEffect(() => {
    receiveAppConfig();
  }, [receiveAppConfig]);

  useEffect(() => {
    resetScreeningError();
  }, [resetScreeningError]);

  const onSubmit = useCallback(
    values => {
      setIsLoading(true);
      submit(values).then(
        () =>
          pushHistory(
            /* istanbul ignore next */
            process.env.REACT_APP_OTP_ENABLE === "N" ? routes.companyInfo : routes.verifyOtp,
            true
          ),
        () => setIsLoading(false)
      );
    },
    [submit, pushHistory]
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
    <ApplicantInfoComponent
      onSubmit={onSubmit}
      isConfigLoading={isConfigLoading}
      isRecaptchaEnable={isRecaptchaEnable}
      reCaptchaSiteKey={reCaptchaSiteKey}
      reCaptchaToken={reCaptchaToken}
      handleReCaptchaVerify={handleReCaptchaVerify}
      handleVerifiedFailed={handleVerifiedFailed}
      isIslamicBanking={isIslamicBanking}
      isLoading={isLoading}
      accountType={accountType}
    />
  );
};
