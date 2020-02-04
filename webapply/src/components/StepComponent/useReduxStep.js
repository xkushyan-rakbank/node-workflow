import { useState } from "react";
import { useDispatch } from "react-redux";

import { setCompletedSteps } from "../../store/actions/completedSteps";
import { useCompletedStep } from "./utils/useCompletedSteps";

export const useReduxStep = (initialStep, id) => {
  const [step, setStep] = useState(initialStep);
  const dispatch = useDispatch();

  const completedSteps = useCompletedStep(id);

  const handleSetNextStep = () => {
    const nextStep = step + 1;

    setStep(nextStep);

    if (!completedSteps.steps.some(item => item.id === step)) {
      dispatch(
        setCompletedSteps(id, {
          ...completedSteps,
          steps: [...completedSteps.steps, { id: step, isAvailable: true, isCompleted: true }]
        })
      );
    }
  };

  const handleSetStep = nextStep => {
    if (completedSteps.steps.some(step => step.id === nextStep && step.isCompleted)) {
      setStep(nextStep);
    }
  };

  return [step, handleSetStep, completedSteps.steps, handleSetNextStep];
};
