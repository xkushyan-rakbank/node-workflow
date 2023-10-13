import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { ApplicantInfoComponent } from "./components/ApplicantInfo";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import {
  formStepper,
  CONVENTIONAL,
  ISLAMIC,
  CREAT_PROSPECT_KEYS,
  UAE_CODE,
  Personas
} from "../../constants";
import routes from "../../routes";
import { setAccessToken, updateProspect } from "../../store/actions/appConfig";
import { setIsFromInvitationLink } from "../../store/actions/applicantInfoForm";
import { OverlayLoader } from "../../components/Loader";

//ro-assist-brd3-16

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
  const dispatch = useDispatch();
  const pushHistory = useTrackingHistory();
  const location = useLocation();
  useFormNavigation([false, false, formStepper]);
  useLayoutParams(false);

  const invitationParams = location.state?.invitationParams || null;
  const { applicantInfo: { persona } = {} } = prospect || {};

  useEffect(() => {
    resetScreeningError();
  }, [resetScreeningError]);

  useEffect(() => {
    const shouldRedirect = !invitationParams && (!persona || !accountType);
    if (shouldRedirect) {
      pushHistory(routes.quickapplyLanding);
    }
  }, []);

  useEffect(() => {
    if (invitationParams && !persona) {
      dispatch(setIsFromInvitationLink());

      const {
        persona: invitationPersona,
        accounttype: invitationAccountType,
        isislamic: invitationIsIslamic,
        rocode: invitationRoCode,
        alliancecode: invitationAllianceCode
      } = invitationParams || {};
      dispatch(
        updateProspect({
          "prospect.applicantInfo.roCode": invitationRoCode,
          "prospect.applicantInfo.persona": invitationPersona,
          "prospect.applicationInfo.accountType": invitationAccountType,
          "prospect.applicationInfo.islamicBanking": invitationIsIslamic === "true",
          "prospect.applicantInfo.allianceCode": invitationAllianceCode,
          "prospect.applicantInfo.isROInitited": true
        })
      );
    }
  }, [invitationParams, persona]);

  const findInDataList = () => {
    dataListCheck();
    const productCode = invitationParams && invitationParams["product-name"];
    const lowerCaseProductCode = productCode ? productCode.toLowerCase() : "";
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
      dispatch(setAccessToken(""));
      setIsLoading(true);
      const submittedValues = { ...values };
      if (invitationParams) {
        submittedValues.isROInitited = true;
      }
      submit(submittedValues)
        .then(() => {
          if (isLemniskEnable) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              Thankyouprd: (isIslamicBanking ? ISLAMIC : CONVENTIONAL) + " " + accountType
            });
          }
        })
        .then(
          () => {
            const { companyFullName, persona } = submittedValues;
            const selectedPersona = Personas[persona];
            dispatch(
              updateProspect({
                "prospect.organizationInfo.companyName": companyFullName.trim(),
                "prospect.organizationInfo.shortName":
                  companyFullName.length <= 50 ? companyFullName.trim() : "",
                "prospect.organizationInfo.companyCategory": selectedPersona?.companyCategoryCode
                  ? selectedPersona.companyCategoryCode
                  : ""
              })
            );
            pushHistory(
              /* istanbul ignore next */
              process.env.REACT_APP_OTP_ENABLE === "N"
                ? routes.companyInfo
                : submittedValues.countryCode === UAE_CODE
                ? routes.verifyMobileOtp
                : routes.verifyEmailOtp,
              true
            );
          },
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
      isDisableNextstep={dataListCheck()}
      handleReCaptchaVerify={handleReCaptchaVerify}
      handleVerifiedFailed={handleVerifiedFailed}
      isIslamicBanking={isIslamicBanking}
      isLoading={isLoading}
      accountType={accountType}
      roCode={roCode}
      isLemniskEnable={isLemniskEnable}
      persona={prospect.applicantInfo?.persona}
      invitationParams={invitationParams}
    />
  );
};
