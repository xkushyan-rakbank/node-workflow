import React, { useState, useCallback, useEffect } from "react";
import isNumber from "lodash/isNumber";

import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { STEP_1 } from "../CompanySummaryCard/constants";
import { SIGNATORY_INITIAL_INDEX } from "../SignatorySummaryCard/constants";

export const FinalQuestionStepComponent = ({
  index,
  addAvailableSignatoryIndex,
  sendProspectToAPI,
  stepsArray
}) => {
  const [step, setStep] = useState(STEP_1);
  const [completedSteps, setCompletedSteps] = useState(new Set([]));

  useEffect(() => {
    if (step > stepsArray.length) {
      const completedIndex = isNumber(index) ? index + 1 : SIGNATORY_INITIAL_INDEX;
      addAvailableSignatoryIndex(completedIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const createChangeStepHandler = item => () => {
    if (completedSteps.has(item.step)) {
      setStep(item.step);
    }
  };

  const handleContinue = useCallback(
    itemStep => () => {
      sendProspectToAPI().then(() => {
        setStep(step + 1);
        setCompletedSteps(new Set([...completedSteps.add(itemStep)]));
      });
    },
    [sendProspectToAPI, step, completedSteps]
  );

  return (
    <>
      {stepsArray.map(item => (
        <StepComponent
          index={index}
          key={item.step}
          steps={stepsArray}
          step={item.step}
          title={item.title}
          infoTitle={item.infoTitle}
          isActiveStep={step === item.step}
          isFilled={completedSteps.has(item.step)}
          handleClick={createChangeStepHandler(item)}
          handleContinue={handleContinue(item.step)}
          stepForm={item.component}
        />
      ))}
    </>
  );
};
