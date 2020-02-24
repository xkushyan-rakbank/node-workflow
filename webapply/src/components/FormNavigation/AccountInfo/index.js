import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAccountType, getIsIslamicBanking } from "../../../store/selectors/appConfig";
import { resetApplicantInfo } from "../../../store/actions/applicantInfoForm";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import routes from "../../../routes";

import { AccountInfoScreen } from "./AccountInfoScreen";
import { getTitleByPathname } from "./utils";
import { accountsInfo } from "./constants";

export const AccountInfo = () => {
  const dispatch = useDispatch();
  const accountType = useSelector(getAccountType);
  const isIslamicBanking = useSelector(getIsIslamicBanking);

  const pushHistory = useTrackingHistory();
  const { pathname } = useLocation();

  const handleCheckStatus = useCallback(() => {
    dispatch(resetApplicantInfo());
    pushHistory(routes.comeBackLogin);
  }, [pushHistory, resetApplicantInfo]);

  const handleStart = useCallback(() => {
    pushHistory(routes.applicantInfo);
  }, [pushHistory]);

  const handleApply = useCallback(() => {
    pushHistory(routes.applicationOverview);
  }, [pushHistory]);

  return (
    <AccountInfoScreen
      title={getTitleByPathname(pathname, accountType)}
      subtitle={accountsInfo[accountType][isIslamicBanking ? "islamicSubtitle" : "subtitle"]}
      resetApplicantInfo={resetApplicantInfo}
      isShowCheck={pathname === routes.ApplicationSubmitted}
      isShowStart={pathname === routes.applicationOverview}
      isShowApply={accountType && pathname === routes.detailedAccount}
      handleCheckStatus={handleCheckStatus}
      handleStart={handleStart}
      handleApply={handleApply}
    />
  );
};
