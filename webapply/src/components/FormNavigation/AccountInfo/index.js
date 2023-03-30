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
  CONVENTIONAL,
  personaSelectionRoutesMap,
  personaSelectionRoutes
} from "../../../constants";

export const AccountInfo = props => {
  const dispatch = useDispatch();
  const accountType = useSelector(getAccountType);
  const isIslamicBanking = useSelector(getIsIslamicBanking);
  const isApplyEditApplication = useSelector(getIsEditableStatusSearchInfo);
  const queryParams = useLocation().search;

  const pushHistory = useTrackingHistory();
  const { pathname: locationPath } = useLocation();
  const pathname = trimEnd(locationPath, "/");

  const handleCheckStatus = useCallback(() => {
    dispatch(resetApplicantInfo());
    pushHistory(routes.comeBackLogin, true);
  }, [pushHistory, dispatch]);

  const handleStart = useCallback(() => {
    dispatch(resetApplicantInfo());
    goto(personaSelectionRoutesMap[accountType][isIslamicBanking ? ISLAMIC : CONVENTIONAL]);
  }, [dispatch, pushHistory]);

  //ro-assist-brd3-16
  const goto = useCallback(
    url => {
      if (queryParams) {
        pushHistory(url + queryParams);
      } else {
        pushHistory(url);
      }
    },
    [pushHistory]
  );

  const handleApply = useCallback(() => {
    goto(applicationOverviewRoutesMap[accountType][isIslamicBanking ? ISLAMIC : CONVENTIONAL]);
  }, [accountType, isIslamicBanking]);

  const isHideTitleOnSmBreakpoint = [
    routes.comeBackLogin,
    routes.comeBackLoginVerification,
    routes.MyApplications,
    routes.reUploadDocuments
  ].includes(pathname);

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
      showSubTitle={accountType && personaSelectionRoutes.includes(pathname)}
      isHideTitleOnSmBreakpoint={isHideTitleOnSmBreakpoint}
      pathname={pathname}
      {...props}
    />
  );
};
