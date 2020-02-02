import { useState, useCallback } from "react";
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

  const handleAnalytics = useCallback(
    eventName => {
      return dispatch(sendGoogleAnalyticsMetrics(eventName));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sendGoogleAnalyticsMetrics]
  );

  return [step, handleSetStep, availableSteps, handleSetNextStep, handleAnalytics];
};
