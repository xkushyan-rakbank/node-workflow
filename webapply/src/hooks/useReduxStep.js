import { useDispatch, useSelector } from "react-redux";

import { setStepStatus, setInitialSteps } from "../store/actions/completedSteps";

export const useReduxStep = (flowId, steps) => {
  const dispatch = useDispatch();

  const availableSteps = useSelector(state =>
    state.completedSteps.filter(item => item.flowId === flowId)
  );
  const { step: activeStep = null } = availableSteps.find(step => step.isActive) || {};

  if (!availableSteps.length) {
    dispatch(
      setInitialSteps(
        steps.map((step, index) => {
          if (index === 0) {
            return {
              flowId,
              step: step.step,
              isActive: true,
              isCompleted: false,
              isAvailable: false
            };
          }
          return {
            flowId,
            step: step.step,
            isActive: false,
            isCompleted: false,
            isAvailable: false
          };
        })
      )
    );
  }

  const handleSetNextStep = step => {
    const nextStep = step + 1;

    dispatch(
      setStepStatus(flowId, step, { isActive: false, isCompleted: true, isAvailable: true })
    );

    if (step < steps.length) {
      dispatch(setStepStatus(flowId, nextStep, { isActive: true }));
    }
  };

  const handleSetStep = nextStep => {
    if (
      availableSteps.some(step => step.step === nextStep && (step.isCompleted || step.isAvailable))
    ) {
      dispatch(setStepStatus(flowId, nextStep, { isActive: true }));
    }
  };

  return [activeStep, availableSteps, handleSetStep, handleSetNextStep];
};
