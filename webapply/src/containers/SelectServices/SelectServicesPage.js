import React, { useState, useCallback } from "react";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { accountNames, CONTINUE, NEXT, STEP_STATUS, formStepper, SAVE } from "../../constants";
import { useStep } from "../../hooks/useStep";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";

import { STEP_3, servicesSteps, SELECT_SERVICES_PAGE_ID } from "./constants";
import { SelectServices } from "./components/SelectServices";

export const SelectServicesPage = ({ accountType, rakValuePackage, sendProspectToAPI }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const pushHistory = useTrackingHistory();
  useFormNavigation([false, true, formStepper]);

  const [
    activeStep,
    availableSteps,
    handleSetStep,
    handleSetNextStep,
    createFormChangeHandler
  ] = useStep(SELECT_SERVICES_PAGE_ID, servicesSteps);

  const isAllStepsCompleted = !availableSteps.some(
    step => step.step < STEP_3 && step.status !== STEP_STATUS.COMPLETED
  );

  const handleClickNextStep = useCallback(() => {
    if (isSubmit) {
      sendProspectToAPI(NEXT).then(isScreeningError => {
        if (!isScreeningError) pushHistory(routes.SubmitApplication, true);
      });
      return;
    }

    handleSetNextStep(activeStep);
    setIsSubmit(true);
  }, [pushHistory, isSubmit, setIsSubmit, handleSetNextStep, activeStep, sendProspectToAPI]);

  const handleContinue = useCallback(
    event => {
      sendProspectToAPI(CONTINUE, event, SAVE, {
        activeStep,
        flowId: SELECT_SERVICES_PAGE_ID
      }).then(() => handleSetNextStep(activeStep), () => {});
    },
    [sendProspectToAPI, activeStep, handleSetNextStep]
  );

  const createSetStepHandler = useCallback(
    nextStep => () => {
      setIsSubmit(false);
      handleSetStep(nextStep);
    },
    [handleSetStep]
  );

  const isNextButtonDisabled =
    !isAllStepsCompleted || (accountType === accountNames.starter && !rakValuePackage);

  return (
    <SelectServices
      activeStep={activeStep}
      availableSteps={availableSteps}
      isSubmit={isSubmit}
      isNextButtonDisabled={isNextButtonDisabled}
      handleContinue={handleContinue}
      handleClickNextStep={handleClickNextStep}
      createFormChangeHandler={createFormChangeHandler}
      createSetStepHandler={createSetStepHandler}
    />
  );
};
