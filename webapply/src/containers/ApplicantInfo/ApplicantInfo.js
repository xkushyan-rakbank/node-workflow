import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { ApplicantInfoComponent } from "./components/ApplicantInfo";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import TermsAndConditionsDialog from "./components/TermsAndConditions/TermsAndConditionsDialog";
import {
  formStepper,
  CONVENTIONAL,
  ISLAMIC,
  CREAT_PROSPECT_KEYS,
  kfsAccountsUrls
} from "../../constants";
import routes from "../../routes";
import { updateProspect } from "../../store/actions/appConfig";

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
  roCode,
  isLemniskEnable,
  prospect
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openKfsDialog, setKfsDialog] = useState(true);

  const height = 841.89;

  const kfsUrl = kfsAccountsUrls[accountType][isIslamicBanking ? ISLAMIC : CONVENTIONAL];

  const pushHistory = useTrackingHistory();
  const query = useQuery();
  useFormNavigation([false, false, formStepper]);
  useLayoutParams(true);
  const dispatch = useDispatch();

  useEffect(() => {
    receiveAppConfig();
  }, [receiveAppConfig]);

  useEffect(() => {
    resetScreeningError();
  }, [resetScreeningError]);

  const findInDataList = () => {
    dataListCheck();
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
  const dataListCheck = () => {
    var keys = prospect ? Object.keys(prospect) : [];
    const areEqual = (array1, array2) => {
      if (array1.length === array2.length) {
        return array1.every((element, index) => {
          if (element === array2[index]) {
            return true;
          }

          return false;
        });
      }

      return false;
    };
    const isDisableNextstep =
      dataList && Object.keys(dataList).length > 0 && areEqual(keys, CREAT_PROSPECT_KEYS);
    return isDisableNextstep;
  };
  const onSubmit = useCallback(
    values => {
      setIsLoading(true);
      submit(values)
        .then(() => {
          if (isLemniskEnable) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              Thankyouprd: (isIslamicBanking ? ISLAMIC : CONVENTIONAL) + " " + accountType
            });
          }
        })
        .then(
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

  const handleClose = () => {
    setKfsDialog(false);
  };

  const handleAccept = () => {
    setKfsDialog(false);
    dispatch(updateProspect({ "prospect.freeFieldsInfo.freeField4": "Y" }));
  };

  return (
    <>
      <ApplicantInfoComponent
        onSubmit={onSubmit}
        //ro-assist-brd3-16
        partnerInfo={findInDataList()}
        isConfigLoading={isConfigLoading}
        isRecaptchaEnable={isRecaptchaEnable}
        reCaptchaSiteKey={reCaptchaSiteKey}
        reCaptchaToken={reCaptchaToken}
        isDisableNextstep={dataListCheck()}
        handleReCaptchaVerify={handleReCaptchaVerify}
        handleVerifiedFailed={handleVerifiedFailed}
        isIslamicBanking={isIslamicBanking}
        isLoading={isLoading}
        accountType={accountType}
        roCode={roCode}
        isLemniskEnable={isLemniskEnable}
      />
      <TermsAndConditionsDialog
        open={openKfsDialog}
        handleClose={handleClose}
        handleAccept={handleAccept}
        kfsUrl={kfsUrl}
        height={height}
        scrollToEnd={true}
      />
    </>
  );
};
