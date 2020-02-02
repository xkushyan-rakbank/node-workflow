import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendGoogleAnalyticsMetrics } from "../../store/actions/googleAnalytics";

export const useStep = (initialStep, initialAvailableSteps = [initialStep]) => {
  const [step, setStep] = useState(initialStep);
  const [availableSteps, setAvailableSteps] = useState(initialAvailableSteps);
  const dispatch = useDispatch();

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

  const handleAnalytics = eventName => {
    return dispatch(sendGoogleAnalyticsMetrics(eventName));
  };

  return [step, handleSetStep, availableSteps, handleSetNextStep, handleAnalytics];
};
