import React, { useCallback } from "react";
import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { SIGNATORY_INITIAL_INDEX, NEXT, STEP_1 } from "../SignatorySummaryCard/constants";
import { useReduxStep } from "../../../../hooks/useReduxStep";

export const FinalQuestionStepComponent = ({
  index = null,
  handleFinalStepContinue,
  sendProspectToAPI,
  stepsArray,
  page
}) => {
  const [availableSteps, handleSetStep, handleSetNextStep] = useReduxStep(page, STEP_1);
  const { id: activeStep = null } = availableSteps.find(step => step.isActive) || {};

  const handleContinue = useCallback(
    eventName => () => {
      sendProspectToAPI(NEXT, eventName).then(
        () => {
          handleSetNextStep(activeStep, activeStep !== stepsArray.length);
          if (activeStep === stepsArray.length) {
            const completedIndex = index !== null ? index + 1 : SIGNATORY_INITIAL_INDEX;
            handleFinalStepContinue(completedIndex, index);
          }
        },
        () => {}
      );
    },
    [sendProspectToAPI, handleSetNextStep]
  );

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  return stepsArray.map(item => (
    <StepComponent
      index={index}
      page={page}
      key={item.step}
      steps={stepsArray}
      step={item.step}
      title={item.title}
      infoTitle={item.infoTitle}
      isActiveStep={activeStep === item.step}
      isFilled={availableSteps.some(step => step.id === item.step && step.isCompleted)}
      handleClick={createSetStepHandler(item.step)}
      handleContinue={handleContinue(item.eventName)}
      stepForm={item.component}
    />
  ));
};
