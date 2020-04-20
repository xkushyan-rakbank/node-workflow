import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import trimEnd from "lodash/trimEnd";

import { getAccountType, getIsIslamicBanking } from "../../../store/selectors/appConfig";
import { getIsEditableStatusSearchInfo } from "../../../store/selectors/searchProspect";
import { resetApplicantInfo } from "../../../store/actions/appConfig";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import routes from "../../../routes";

import { AccountInfoScreen } from "./AccountInfoScreen";
import { getTitleByPathname } from "./utils";
import { accountsInfo } from "./constants";
import {
  applicationOverviewRoutesMap,
  applicationOverviewRoutes,
  detailedAccountRoutes,
  ISLAMIC,
  CONVENTIONAL
} from "../../../constants";

export const AccountInfo = props => {
  const dispatch = useDispatch();
  const accountType = useSelector(getAccountType);
  const isIslamicBanking = useSelector(getIsIslamicBanking);
  const isApplyEditApplication = useSelector(getIsEditableStatusSearchInfo);

  const pushHistory = useTrackingHistory();
  const { pathname: locationPath } = useLocation();
  const pathname = trimEnd(locationPath, "/");
  const isHideTitleOnSmBreakpoint = [
    routes.comeBackLogin,
    routes.comeBackLoginVerification,
    routes.MyApplications,
    routes.reUploadDocuments
  ].includes(pathname);

  const handleCheckStatus = useCallback(() => {
    dispatch(resetApplicantInfo());
    pushHistory(routes.comeBackLogin, true);
  }, [pushHistory, dispatch]);

  const handleStart = useCallback(() => {
    dispatch(resetApplicantInfo());
    pushHistory(routes.applicantInfo);
  }, [dispatch, pushHistory]);

  const handleApply = useCallback(() => {
    pushHistory(
      applicationOverviewRoutesMap[accountType][isIslamicBanking ? ISLAMIC : CONVENTIONAL]
    );
  }, [pushHistory, accountType, isIslamicBanking]);

  return (
    <AccountInfoScreen
      title={getTitleByPathname(pathname, accountType)}
      subtitle={
        accountType && accountsInfo[accountType][isIslamicBanking ? "islamicSubtitle" : "subtitle"]
      }
      isShowCheck={pathname === routes.ApplicationSubmitted}
      isShowStart={applicationOverviewRoutes.includes(pathname)}
      isShowApply={accountType && detailedAccountRoutes.includes(pathname)}
      isApplyEditApplication={isApplyEditApplication}
      handleCheckStatus={handleCheckStatus}
      handleStart={handleStart}
      handleApply={handleApply}
      isHideTitleOnSmBreakpoint={isHideTitleOnSmBreakpoint}
      {...props}
    />
  );
};
