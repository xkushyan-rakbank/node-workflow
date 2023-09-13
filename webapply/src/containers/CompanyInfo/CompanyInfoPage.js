import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { useViewId } from "../../utils/useViewId";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { NEXT, formStepper, operatorLoginScheme } from "../../constants";
import routes from "../../routes";
import { CompanyInfo } from "./components/CompanyInfo";
import { OverlayLoader } from "../../components/Loader";
import { getLoginResponse } from "../../store/selectors/loginSelector";

export const CompanyInfoPage = ({
  sendProspectToAPI,
  isSendingProspect,
  fullName,
  companyName,
  isComeFromROScreens
}) => {
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);
  const pushHistory = useTrackingHistory();
  const { scheme } = useSelector(getLoginResponse);

  const [isLoading, setIsLoading] = useState(false);

  const handleClickNextStep = useCallback(() => {
    setIsLoading(true);

    return sendProspectToAPI(NEXT).then(
      isScreeningError => {
        /* istanbul ignore else */
        if (!isScreeningError) {
          if (scheme === operatorLoginScheme) {
            pushHistory(routes.stakeholdersPreview, true);
          } else {
            pushHistory(routes.stakeholdersInfo, true);
          }
        }
      },
      () => setIsLoading(false)
    );
  }, [pushHistory, sendProspectToAPI]);

  return (
    <>
      <CompanyInfo
        fullName={fullName}
        companyName={companyName}
        isSendingProspect={isSendingProspect}
        isComeFromROScreens={isComeFromROScreens}
        isLoading={isLoading}
        handleClickNextStep={handleClickNextStep}
        showLoading={data => setIsLoading(data)}
      />
      <OverlayLoader open={isLoading} text={"Please wait while we are saving your data..."} />
    </>
  );
};
