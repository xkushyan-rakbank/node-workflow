import React, { useEffect, useCallback } from "react";

import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { STEP_1 } from "../CompanySummaryCard/constants";
import { SIGNATORY_INITIAL_INDEX } from "../SignatorySummaryCard/constants";
import { useStep } from "../../../../components/StepComponent/useStep";

export const FinalQuestionStepComponent = ({
  index = null,
  handleFinalStepContinue,
  sendProspectToAPI,
  stepsArray
}) => {
  const { step, availableSteps, handleSetNextStep, handleSetStep } = useStep(STEP_1);

  const handleContinue = useCallback(() => {
    sendProspectToAPI().then(() => handleSetNextStep(), () => {});
  }, [sendProspectToAPI, step]);
  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  useEffect(() => {
    if (step > stepsArray.length) {
      const completedIndex = index !== null ? index + 1 : SIGNATORY_INITIAL_INDEX;
      handleFinalStepContinue(completedIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return stepsArray.map(item => (
    <StepComponent
      index={index}
      key={item.step}
      steps={stepsArray}
      step={item.step}
      title={item.title}
      infoTitle={item.infoTitle}
      isActiveStep={step === item.step}
      isFilled={availableSteps.includes(item.step)}
      handleClick={createSetStepHandler(item.step)}
      handleContinue={handleContinue}
      stepForm={item.component}
    />
  ));
};
