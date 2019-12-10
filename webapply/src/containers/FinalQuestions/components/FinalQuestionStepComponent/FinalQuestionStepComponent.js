import React, { useEffect } from "react";

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
  const { step, availableSteps, handleContinue, handleSetStep } = useStep(
    STEP_1,
    sendProspectToAPI
  );

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
      handleClick={() => handleSetStep(item.step)}
      handleContinue={handleContinue}
      stepForm={item.component}
    />
  ));
};
