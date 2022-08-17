import React, { useCallback, useState } from "react";

import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { useStep } from "../../utils/useStep";
import { useViewId } from "../../utils/useViewId";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { CONTINUE, NEXT, formStepper, SAVE } from "../../constants";
import { checkAllStepsCompleted } from "../../utils/checkAllStepsCompleted";
import routes from "./../../routes";
import { CompanyInfo } from "./components/CompanyInfo";
import { companyInfoSteps, COMPANY_INFO_PAGE_ID } from "./constants";

export const CompanyInfoPage = ({
  sendProspectToAPI,
  isSendingProspect,
  fullName,
  companyName,
  isComeFromROScreens,
  kycAnnexureDetails
}) => {
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(true, true);
  useViewId(true);
  const pushHistory = useTrackingHistory();
  const [
    activeStep,
    availableSteps,
    handleSetStep,
    handleSetNextStep,
    createFormChangeHandler
  ] = useStep(COMPANY_INFO_PAGE_ID, companyInfoSteps);
  const [isLoading, setIsLoading] = useState(false);
  const isAllStepsCompleted = checkAllStepsCompleted(availableSteps);

  const handleContinue = event => () =>
    sendProspectToAPI(CONTINUE, event, SAVE, {
      activeStep,
      flowId: COMPANY_INFO_PAGE_ID
    }).then(() => handleSetNextStep(activeStep), () => {});

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

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
      activeStep={activeStep}
      availableSteps={availableSteps}
      isSendingProspect={isSendingProspect}
      isComeFromROScreens={isComeFromROScreens}
      isAllStepsCompleted={isAllStepsCompleted}
      isLoading={isLoading}
      handleClickNextStep={handleClickNextStep}
      handleContinue={handleContinue}
      createFormChangeHandler={createFormChangeHandler}
      kycAnnexureDetails={kycAnnexureDetails}
      createSetStepHandler={createSetStepHandler}
    />
  );
};
