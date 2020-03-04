import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { getApplicationInfo } from "../store/selectors/appConfig";
import { getIsEditableStatusSearchInfo } from "../store/selectors/searchProspect";
import routes, { smeBaseName } from "../routes";
import { ACTION_TYPES, VIEW_IDS } from "../constants";

export const useDisplayScreenBasedOnViewId = () => {
  const history = useHistory();
  const location = useLocation();
  const { applicationInfo, isROScreens } = useSelector(state => ({
    applicationInfo: getApplicationInfo(state),
    isROScreens: getIsEditableStatusSearchInfo(state)
  }));

  const pushDisplayScreenToHistory = useCallback(
    prospect => {
      const newApplicationInfo = prospect ? prospect.applicationInfo : applicationInfo;
      const viewId = newApplicationInfo.viewId || routes.companyInfo.replace(smeBaseName, "");
      const isSubmit =
        newApplicationInfo.actionType === ACTION_TYPES.submit &&
        newApplicationInfo.viewId === VIEW_IDS.SubmitApplication;
      const isRetrieveMode = newApplicationInfo.retrieveMode;
      const isEditRedirect = location.pathname.includes(VIEW_IDS.SearchedAppInfo);

      let url = `${smeBaseName}${viewId}`;
      if (isSubmit) {
        if (!isROScreens) {
          url = isRetrieveMode
            ? routes.ApplicationSubmitted
            : `${smeBaseName}${newApplicationInfo.reUploadDocuments}`;
        } else if (isEditRedirect) {
          url = routes.companyInfo;
        }
      }

      if (isROScreens && viewId === VIEW_IDS.ApplicationSubmitted) {
        url = routes.companyInfo;
      }

      history.push(url);
    },
    [applicationInfo, isROScreens, history, location]
  );

  return {
    pushDisplayScreenToHistory
  };
};
