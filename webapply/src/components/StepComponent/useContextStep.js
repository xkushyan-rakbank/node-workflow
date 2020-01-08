import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { StepStateContext } from "./StepStateContext";

export const useContextStep = (initialStep, fieldName, index = null) => {
  const [step, setStep] = useState(initialStep);
  const { setCompletedSteps, setCompletedStepsArray, ...state } = useContext(StepStateContext);
  const { location } = useHistory();

  let availableSteps;

  if (index !== null) {
    availableSteps = state[location.pathname][fieldName][index] || [];
  } else {
    availableSteps = state[location.pathname][fieldName] || [];
  }

  const handleSetNextStep = () => {
    const nextStep = step + 1;

    setStep(nextStep);
    if (!availableSteps.includes(step)) {
      index === null
        ? setCompletedSteps(location.pathname, fieldName, [...availableSteps, step])
        : setCompletedStepsArray(location.pathname, fieldName, index, [...availableSteps, step]);
    }
  };

  const handleSetStep = nextStep => {
    if (availableSteps.includes(nextStep)) {
      setStep(nextStep);
    }
  };

  return [step, handleSetStep, availableSteps, handleSetNextStep];
};
