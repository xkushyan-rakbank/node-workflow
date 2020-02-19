import React, { useCallback } from "react";
import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { SIGNATORY_INITIAL_INDEX } from "../SignatorySummaryCard/constants";
import { useStep } from "../../../../hooks/useStep";
import { CONTINUE, STEP_STATUS } from "../../../../constants";

export const FinalQuestionStepComponent = ({
  index = null,
  handleFinalStepContinue,
  sendProspectToAPI,
  stepsArray,
  page
}) => {
  const [activeStep, availableSteps, handleSetStep, handleSetNextStep] = useStep(page, stepsArray);

  const handleContinue = useCallback(
    eventName => () => {
      sendProspectToAPI(CONTINUE, eventName).then(
        () => {
          handleSetNextStep(activeStep);
          if (activeStep === stepsArray.length) {
            const completedIndex = index !== null ? index + 1 : SIGNATORY_INITIAL_INDEX;
            handleFinalStepContinue(completedIndex, index);
          }
        },
        () => {}
      );
    },
    [sendProspectToAPI, handleSetNextStep, index, stepsArray, handleFinalStepContinue, activeStep]
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
      isFilled={availableSteps.some(
        step => step.step === item.step && step.status === STEP_STATUS.COMPLETED
      )}
      handleClick={createSetStepHandler(item.step)}
      handleContinue={handleContinue(item.eventName)}
      stepForm={item.component}
    />
  ));
};
