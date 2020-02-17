import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { setStepStatus, setInitialSteps } from "../store/actions/completedSteps";
import { STEP_STATUS } from "../constants";

export const useStep = (flowId, steps) => {
  const [activeStep, setActiveStep] = useState(null);
  const dispatch = useDispatch();

  const availableSteps = useSelector(state => {
    return state.completedSteps.filter(item => item.flowId === flowId);
  });

  if (!availableSteps.length) {
    dispatch(
      setInitialSteps(
        steps.map(step => ({
          flowId,
          step: step.step,
          status: STEP_STATUS.NOT_AVAILABLE
        }))
      )
    );
    setActiveStep(steps[0].step);
  } else if (!activeStep) {
    setActiveStep(steps[0].step);
  }

  const handleSetNextStep = step => {
    const nextStep = step < steps.length ? step + 1 : null;

    setActiveStep(nextStep);
    dispatch(setStepStatus(flowId, step, STEP_STATUS.COMPLETED));
  };

  const handleSetStep = nextStep => {
    if (
      availableSteps.some(
        step =>
          step.step === nextStep &&
          (step.status === STEP_STATUS.COMPLETED || step.status === STEP_STATUS.AVAILABLE)
      )
    ) {
      setActiveStep(nextStep);
    }
  };

  return [activeStep, availableSteps, handleSetStep, handleSetNextStep];
};
