import { useDispatch, useSelector } from "react-redux";

import { setStepStatus, setInitialSteps } from "../store/actions/completedSteps";
import { STEP_STATUS } from "../constants";

export const useReduxStep = (flowId, steps) => {
  const dispatch = useDispatch();

  const availableSteps = useSelector(state =>
    state.completedSteps.filter(item => item.flowId === flowId)
  );
  const { step: activeStep = null } =
    availableSteps.find(step => step.status === STEP_STATUS.ACTIVE) || {};

  if (!availableSteps.length) {
    dispatch(
      setInitialSteps(
        steps.map((step, index) => {
          if (index === 0) {
            return {
              flowId,
              step: step.step,
              status: STEP_STATUS.ACTIVE
            };
          }
          return { flowId, step: step.step };
        })
      )
    );
  }

  const handleSetNextStep = step => {
    const nextStep = step + 1;

    dispatch(setStepStatus(flowId, step, STEP_STATUS.COMPLETED));

    if (nextStep < steps.length) {
      dispatch(setStepStatus(flowId, nextStep, STEP_STATUS.ACTIVE));
    }
  };

  const handleSetStep = nextStep => {
    if (
      availableSteps.some(
        step =>
          step.step === nextStep &&
          (step.status === STEP_STATUS.COMPLETED || step.status === STEP_STATUS.AVAILABLE)
      )
    ) {
      dispatch(setStepStatus(flowId, nextStep, STEP_STATUS.ACTIVE));
    }
  };

  return [activeStep, availableSteps, handleSetStep, handleSetNextStep];
};
