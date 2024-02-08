import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { getApplicationInfo, getProspectId } from "../store/selectors/appConfig";
import {
  getIsEditableStatusSearchInfo,
  getSearchResultsStatuses
} from "../store/selectors/searchProspect";
import routes, { smeBaseName } from "../routes";
import { ACTION_TYPES, VIEW_IDS } from "../constants";

export const useDisplayScreenBasedOnViewId = () => {
  const history = useHistory();
  const location = useLocation();
  const applicationInfo = useSelector(getApplicationInfo);
  const prospectIdFromStore = useSelector(getProspectId);
  const isROScreens = useSelector(getIsEditableStatusSearchInfo);
  const statuses = useSelector(getSearchResultsStatuses);

  const pushDisplayScreenToHistory = useCallback(
    prospect => {
      const newApplicationInfo = prospect ? prospect.applicationInfo : applicationInfo;
      const viewId = newApplicationInfo.viewId || routes.companyInfo.replace(smeBaseName, "");
      const prospectId = prospect ? prospect.generalInfo.prospectId : prospectIdFromStore;
      const isSubmit =
        newApplicationInfo?.actionType === ACTION_TYPES.submit &&
        prospect?.viewId === VIEW_IDS.SubmitApplication;
      const isRetrieveMode = newApplicationInfo?.retrieveMode;
      const isEditRedirect = location.pathname.includes(VIEW_IDS.SearchedAppInfo);
      const prospectStatus = (statuses.find(status => status.prospectId === prospectId) || {})
        .statusType;
      let url = `${smeBaseName}${viewId}`;
      if (isSubmit) {
        if (!isROScreens) {
          url = isRetrieveMode ? routes.ApplicationSubmitted : routes.additionalInformation;
        } else {
          /* istanbul ignore else */
          if (isEditRedirect) {
            url = routes.companyInfo;
          }
        }
      }
      if (
        isROScreens &&
        [VIEW_IDS.ApplicationSubmitted, VIEW_IDS.ReUploadDocuments].includes(viewId)
      ) {
        url = routes.companyInfo;
      }
      if (prospectStatus === "INFO_REQUIRED") {
        url = routes.additionalInformation;
      }

      history.push(url);
    },
    [applicationInfo, prospectIdFromStore, isROScreens, history, location, statuses]
  );

  return {
    pushDisplayScreenToHistory
  };
};
