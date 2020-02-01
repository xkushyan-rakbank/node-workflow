import React, { useEffect } from "react";

import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { SIGNATORY_INITIAL_INDEX } from "../SignatorySummaryCard/constants";
import { useStep } from "../../../../components/StepComponent/useStep";

export const FinalQuestionStepComponent = ({
  index = null,
  handleFinalStepContinue,
  sendProspectToAPI,
  stepsArray,
  fieldName,
  initialStep
}) => {
  const [step, handleSetStep, availableSteps, handleSetNextStep, handleAnalytics] = useStep(
    initialStep
  );

  const handleContinue = eventName => () => {
    handleAnalytics(eventName);
    sendProspectToAPI().then(() => handleSetNextStep(), () => {});
  };

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  useEffect(() => {
    if (step > stepsArray.length) {
      const completedIndex = index !== null ? index + 1 : SIGNATORY_INITIAL_INDEX;
      handleFinalStepContinue(completedIndex, index);
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
      handleContinue={handleContinue(item.event_name)}
      stepForm={item.component}
    />
  ));
};
