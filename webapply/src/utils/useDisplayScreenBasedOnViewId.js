import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getApplicationInfo } from "../store/selectors/appConfig";
import { getIsEditableStatusSearchInfo } from "../store/selectors/searchProspect";
import routes from "../routes";

const prefix = "/sme";

export const useDisplayScreenBasedOnViewId = () => {
  const history = useHistory();
  const { applicationInfo, isROScreens } = useSelector(state => ({
    state,
    applicationInfo: getApplicationInfo(state),
    isROScreens: getIsEditableStatusSearchInfo(state)
  }));

  const onDisplayScreen = useCallback(() => {
    const viewId = applicationInfo.viewId;
    const isSubmit = applicationInfo.actionType === "submit";
    const isRetrieveMode = applicationInfo.retrieveMode;
    const isApplicationSubmitted =
      viewId === "/ApplicationSubmitted" && viewId !== "/SearchProspect";
    const pathTo = isApplicationSubmitted ? "/CompanyInfo" : viewId;

    if (!isROScreens) {
      if (isSubmit && isRetrieveMode) {
        history.push(`${prefix}${routes.ApplicationSubmitted}`);
      } else if (isSubmit && !isRetrieveMode) {
        history.push(`${prefix}${applicationInfo.reUploadDocuments}`);
      } else if (viewId && !isApplicationSubmitted) {
        history.push(`${prefix}${pathTo}`);
      }
    } else {
      history.push(`${prefix}${pathTo}`);
    }
  }, [applicationInfo, isROScreens]);

  return {
    onDisplayScreen
  };
};
