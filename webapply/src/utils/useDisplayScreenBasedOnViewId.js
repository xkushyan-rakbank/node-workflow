import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getApplicationInfo } from "../store/selectors/appConfig";
import { getIsEditableStatusSearchInfo } from "../store/selectors/searchProspect";
import routes from "../routes";
import { ACTION_TYPES, VIEW_IDS } from "../constants";

const prefix = "/sme";

export const useDisplayScreenBasedOnViewId = () => {
  const history = useHistory();
  const { applicationInfo, isROScreens } = useSelector(state => ({
    applicationInfo: getApplicationInfo(state),
    isROScreens: getIsEditableStatusSearchInfo(state)
  }));

  const pushDisplayScreenToHistory = useCallback(() => {
    const viewId = applicationInfo.viewId;
    const isSubmit = applicationInfo.actionType === ACTION_TYPES.submit;
    const isRetrieveMode = applicationInfo.retrieveMode;
    const isApplicationSubmitted =
      viewId === VIEW_IDS.SubmitApplication && viewId !== VIEW_IDS.SearchProspect;
    const pathTo = isApplicationSubmitted ? VIEW_IDS.CompanyInfo : viewId;
    const isEditRedirect = viewId.includes("SearchedAppInfo");

    if (!isROScreens) {
      if (isSubmit && isRetrieveMode) {
        history.push(`${prefix}${routes.ApplicationSubmitted}`);
      } else if (isSubmit && !isRetrieveMode) {
        history.push(`${prefix}${applicationInfo.reUploadDocuments}`);
      } else if (viewId && !isApplicationSubmitted) {
        history.push(`${prefix}${pathTo}`);
      }
    } else {
      if (isEditRedirect) {
        history.push(routes.companyInfo);
      }
      history.push(`${prefix}${pathTo}`);
    }
  }, [applicationInfo, isROScreens]);

  return {
    pushDisplayScreenToHistory
  };
};
