import React, { useState, useCallback, useEffect } from "react";

import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { STEP_1 } from "../CompanySummaryCard/constants";
import { SIGNATORY_INITIAL_INDEX } from "../SignatorySummaryCard/constants";

export const FinalQuestionStepComponent = ({
  index = null,
  addAvailableSignatoryIndex,
  sendProspectToAPI,
  stepsArray
}) => {
  const [step, setStep] = useState(STEP_1);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    if (step > stepsArray.length) {
      const completedIndex = index !== null ? index + 1 : SIGNATORY_INITIAL_INDEX;
      addAvailableSignatoryIndex(completedIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const createChangeStepHandler = item => () => {
    if (completedSteps.includes(item.step)) {
      setStep(item.step);
    }
  };

  const handleContinue = useCallback(
    itemStep => () => {
      sendProspectToAPI().then(() => {
        setStep(step + 1);
        if (!completedSteps.includes(itemStep)) {
          setCompletedSteps([...completedSteps, itemStep]);
        }
      });
    },
    [sendProspectToAPI, step, completedSteps]
  );

  return stepsArray.map(item => (
    <StepComponent
      index={index}
      key={item.step}
      steps={stepsArray}
      step={item.step}
      title={item.title}
      infoTitle={item.infoTitle}
      isActiveStep={step === item.step}
      isFilled={completedSteps.includes(item.step)}
      handleClick={createChangeStepHandler(item)}
      handleContinue={handleContinue(item.step)}
      stepForm={item.component}
    />
  ));
};
