import { useState } from "react";

export const useStep = initialStep => {
  const [step, setStep] = useState(initialStep);
  const [availableSteps, setAvailableSteps] = useState([initialStep]);

  const handleSetNextStep = () => {
    const nextStep = step + 1;

    setStep(nextStep);
    if (!availableSteps.includes(nextStep)) {
      setAvailableSteps([...availableSteps, nextStep]);
    }
  };

  const handleSetStep = nextStep => {
    if (availableSteps.includes(nextStep)) {
      setStep(nextStep);
    }
  };

  return [step, availableSteps, handleSetNextStep, handleSetStep];
};
