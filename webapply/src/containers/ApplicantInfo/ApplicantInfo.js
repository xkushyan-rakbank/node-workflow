import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { ApplicantInfoComponent } from "./components/ApplicantInfo";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { formStepper } from "../../constants";
import routes from "../../routes";

//ro-assist-brd3-16
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

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
  isIslamicBanking,
  dataList,
  roCode
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const pushHistory = useTrackingHistory();
  const query = useQuery();
  useFormNavigation([false, false, formStepper]);
  useLayoutParams(true);

  useEffect(() => {
    receiveAppConfig();
  }, [receiveAppConfig]);

  useEffect(() => {
    resetScreeningError();
  }, [resetScreeningError]);

  const findInDataList = () => {
    const productCode = query.get("product-name");
    const lowerCaseProductCode = productCode !== null ? productCode.toLowerCase() : "";
    if (dataList["allianceCode"] !== undefined) {
      return dataList["allianceCode"].find(
        element => element.code.toLowerCase() == lowerCaseProductCode
      );
    } else {
      return undefined;
    }
  };
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
      //ro-assist-brd3-16
      partnerInfo={findInDataList()}
      isConfigLoading={isConfigLoading}
      isRecaptchaEnable={isRecaptchaEnable}
      reCaptchaSiteKey={reCaptchaSiteKey}
      reCaptchaToken={reCaptchaToken}
      handleReCaptchaVerify={handleReCaptchaVerify}
      handleVerifiedFailed={handleVerifiedFailed}
      isIslamicBanking={isIslamicBanking}
      isLoading={isLoading}
      accountType={accountType}
      roCode={roCode}
    />
  );
};
