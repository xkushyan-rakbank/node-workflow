import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { getApplicationInfo } from "../store/selectors/appConfig";
import {
  getIsEditableStatusSearchInfo,
  getSearchResultsStatuses
} from "../store/selectors/searchProspect";
import routes, { smeBaseName } from "../routes";
import { ACTION_TYPES, VIEW_IDS } from "../constants";
import { PROSPECT_STATUSES } from "../constants/index";

export const useDisplayScreenBasedOnViewId = () => {
  const history = useHistory();
  const location = useLocation();
  const applicationInfo = useSelector(getApplicationInfo);
  const isROScreens = useSelector(getIsEditableStatusSearchInfo);
  const statuses = useSelector(getSearchResultsStatuses);

  const pushDisplayScreenToHistory = useCallback(
    prospect => {
      const newApplicationInfo = prospect ? prospect.applicationInfo : applicationInfo;
      const viewId = newApplicationInfo.viewId || routes.companyInfo.replace(smeBaseName, "");
      const prospectId = prospect.generalInfo.prospectId;
      const isSubmit =
        newApplicationInfo.actionType === ACTION_TYPES.submit &&
        newApplicationInfo.viewId === VIEW_IDS.SubmitApplication;
      const isRetrieveMode = newApplicationInfo.retrieveMode;
      const isEditRedirect = location.pathname.includes(VIEW_IDS.SearchedAppInfo);
      const prospectStatus = statuses.find(status => status.prospectId === prospectId).status;

      let url = `${smeBaseName}${viewId}`;
      if (isSubmit) {
        if (!isROScreens) {
          url = isRetrieveMode ? routes.ApplicationSubmitted : routes.reUploadDocuments;
        } else if (isEditRedirect) {
          url = routes.companyInfo;
        }
      }
      if (isROScreens && viewId === VIEW_IDS.ApplicationSubmitted) {
        url = routes.companyInfo;
      }
      if (
        !isROScreens &&
        (prospectStatus === PROSPECT_STATUSES.DOCUMENTS_NEEDED ||
          prospectStatus === PROSPECT_STATUSES.NEED_ADDITIONAL_DOCUMENTS)
      ) {
        url = routes.reUploadDocuments;
      }

      history.push(url);
    },
    [applicationInfo, isROScreens, history, location, statuses]
  );

  return {
    pushDisplayScreenToHistory
  };
};
