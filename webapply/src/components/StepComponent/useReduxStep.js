import { useState } from "react";
import { useDispatch } from "react-redux";

import { setCompletedSteps } from "../../store/actions/completedSteps";
import { useCompletedStep } from "./utils/useCompletedSteps";
import { addCompletedStep } from "./utils/addCompletedStep";

export const useReduxStep = (initialStep, page, path, index = null) => {
  const [step, setStep] = useState(initialStep);
  const dispatch = useDispatch();

  const [pageCompletedSteps, completedSteps] = useCompletedStep(page, path, index);

  const handleSetNextStep = () => {
    const nextStep = step + 1;

    setStep(nextStep);

    if (!completedSteps.includes(step)) {
      const steps = addCompletedStep(pageCompletedSteps, completedSteps, step, page, path, index);
      dispatch(setCompletedSteps(page, steps));
    }
  };

  const handleSetStep = nextStep => {
    if (completedSteps.includes(nextStep)) {
      setStep(nextStep);
    }
  };

  return [step, handleSetStep, completedSteps, handleSetNextStep];
};
