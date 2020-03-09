import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAccountType, getIsIslamicBanking } from "../../../store/selectors/appConfig";
import { getIsEditableStatusSearchInfo } from "../../../store/selectors/searchProspect";
import { resetApplicantInfo } from "../../../store/actions/appConfig";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import routes from "../../../routes";

import { AccountInfoScreen } from "./AccountInfoScreen";
import { getTitleByPathname } from "./utils";
import { accountsInfo } from "./constants";

export const AccountInfo = props => {
  const dispatch = useDispatch();
  const accountType = useSelector(getAccountType);
  const isIslamicBanking = useSelector(getIsIslamicBanking);
  const isApplyEditApplication = useSelector(getIsEditableStatusSearchInfo);

  const pushHistory = useTrackingHistory();
  const { pathname } = useLocation();

  const handleCheckStatus = useCallback(() => {
    dispatch(resetApplicantInfo());
    pushHistory(routes.comeBackLogin, true);
  }, [pushHistory, dispatch]);

  const handleStart = useCallback(() => {
    dispatch(resetApplicantInfo());
    pushHistory(routes.applicantInfo);
  }, [pushHistory]);

  const handleApply = useCallback(() => {
    pushHistory(routes.applicationOverview);
  }, [pushHistory]);

  return (
    <AccountInfoScreen
      title={getTitleByPathname(pathname, accountType)}
      subtitle={
        accountType && accountsInfo[accountType][isIslamicBanking ? "islamicSubtitle" : "subtitle"]
      }
      isShowCheck={pathname === routes.ApplicationSubmitted}
      isShowStart={pathname === routes.applicationOverview}
      isShowApply={accountType && pathname === routes.detailedAccount}
      isApplyEditApplication={isApplyEditApplication}
      handleCheckStatus={handleCheckStatus}
      handleStart={handleStart}
      handleApply={handleApply}
      {...props}
    />
  );
};
