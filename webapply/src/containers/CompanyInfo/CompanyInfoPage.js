import React, { useCallback, useState } from "react";

import { useTrackingHistory } from "../../utils/useTrackingHistory";

import { useViewId } from "../../utils/useViewId";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { NEXT, formStepper } from "../../constants";
import routes from "../../routes";
import { CompanyInfo } from "./components/CompanyInfo";

export const CompanyInfoPage = ({
  sendProspectToAPI,
  isSendingProspect,
  fullName,
  companyName,
  isComeFromROScreens
}) => {
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(true, true);
  useViewId(true);
  const pushHistory = useTrackingHistory();

  const [isLoading, setIsLoading] = useState(false);

  const handleClickNextStep = useCallback(() => {
    setIsLoading(true);

    return sendProspectToAPI(NEXT).then(
      isScreeningError => {
        /* istanbul ignore else */
        if (!isScreeningError) pushHistory(routes.stakeholdersInfo, true);
      },
      () => setIsLoading(false)
    );
  }, [pushHistory, sendProspectToAPI]);

  return (
    <CompanyInfo
      fullName={fullName}
      companyName={companyName}
      isSendingProspect={isSendingProspect}
      isComeFromROScreens={isComeFromROScreens}
      isLoading={isLoading}
      handleClickNextStep={handleClickNextStep}
    />
  );
};
