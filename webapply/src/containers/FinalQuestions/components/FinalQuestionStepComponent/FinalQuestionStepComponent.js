import React from "react";
import get from "lodash/get";

import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { SIGNATORY_INITIAL_INDEX } from "../SignatorySummaryCard/constants";
import { useReduxStep } from "../../../../hooks/useReduxStep";

export const FinalQuestionStepComponent = ({
  index = null,
  handleFinalStepContinue,
  sendProspectToAPI,
  stepsArray,
  page
}) => {
  const [availableSteps, handleSetStep, handleSetNextStep] = useReduxStep(page);
  const activeStep = get(availableSteps.find(step => step.isActive), "id", null);

  const handleContinue = () =>
    sendProspectToAPI().then(
      () => {
        handleSetNextStep(activeStep, activeStep !== stepsArray.length);
        if (activeStep === stepsArray.length) {
          const completedIndex = index !== null ? index + 1 : SIGNATORY_INITIAL_INDEX;
          handleFinalStepContinue(completedIndex, index);
        }
      },
      () => {}
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
      handleContinue={handleContinue}
      stepForm={item.component}
    />
  ));
};
