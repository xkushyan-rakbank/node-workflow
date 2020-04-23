import React, { useCallback } from "react";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { accountNames, CONTINUE, NEXT, STEP_STATUS, formStepper, SAVE } from "../../constants";
import { useViewId } from "../../utils/useViewId";
import { useStep } from "../../utils/useStep";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";

import { servicesSteps, SELECT_SERVICES_PAGE_ID, STEP_4 } from "./constants";
import { SelectServices } from "./components/SelectServices";

export const SelectServicesPage = ({ accountType, rakValuePackage, sendProspectToAPI }) => {
  const pushHistory = useTrackingHistory();
  useFormNavigation([false, true, formStepper]);
  useViewId(true);

  const [
    activeStep,
    availableSteps,
    handleSetStep,
    handleSetNextStep,
    createFormChangeHandler
  ] = useStep(SELECT_SERVICES_PAGE_ID, servicesSteps);

  const isAllStepsCompleted = !availableSteps.some(
    step => step.step < STEP_4 && step.status !== STEP_STATUS.COMPLETED
  );

  const isSubmitOnClickNextStepButton = activeStep !== STEP_4;

  const handleClickNextStep = useCallback(() => {
    if (isSubmitOnClickNextStepButton) {
      sendProspectToAPI(NEXT).then(
        isScreeningError => {
          if (!isScreeningError) pushHistory(routes.SubmitApplication, true);
        },
        () => {}
      );
    } else {
      handleSetNextStep(activeStep);
    }
  }, [
    pushHistory,
    isSubmitOnClickNextStepButton,
    handleSetNextStep,
    activeStep,
    sendProspectToAPI
  ]);

  const handleContinue = useCallback(
    event =>
      sendProspectToAPI(CONTINUE, event, SAVE, {
        activeStep,
        flowId: SELECT_SERVICES_PAGE_ID
      }).then(() => handleSetNextStep(activeStep), () => {}),
    [sendProspectToAPI, activeStep, handleSetNextStep]
  );

  const createSetStepHandler = useCallback(
    nextStep => () => {
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
      isSubmitOnClickNextStepButton={isSubmitOnClickNextStepButton}
      isNextButtonDisabled={isNextButtonDisabled}
      handleContinue={handleContinue}
      handleClickNextStep={handleClickNextStep}
      createFormChangeHandler={createFormChangeHandler}
      createSetStepHandler={createSetStepHandler}
    />
  );
};
