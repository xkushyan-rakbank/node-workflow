import { useCallback, useState } from "react";

export function useStep(initialStep, sendProspectToAPI) {
  const [step, setStep] = useState(initialStep);
  const [availableSteps, setAvailableSteps] = useState([initialStep]);

  const handleContinue = useCallback(() => {
    sendProspectToAPI().then(
      () => {
        const nextStep = step + 1;
        setStep(nextStep);
        if (!availableSteps.includes(nextStep)) {
          setAvailableSteps([...availableSteps, nextStep]);
        }
      },
      () => {}
    );
  }, [sendProspectToAPI, step, availableSteps]);

  const createSetStepHandler = nextStep => {
    if (availableSteps.includes(nextStep)) {
      setStep(nextStep);
    }
  };

  return {
    step,
    availableSteps,
    handleContinue,
    createSetStepHandler
  };
}
