import { useDispatch, useSelector } from "react-redux";

import { setStep, setInitialStep, addStep, setStepIsActive } from "../store/actions/completedSteps";

const INITIAL_INDEX = 1;

export const useReduxStep = flowId => {
  const dispatch = useDispatch();

  const availableSteps = useSelector(
    state => state.completedSteps.find(item => item.flowId === flowId) || { flowId, steps: [] }
  ).steps;

  if (!availableSteps.length) {
    dispatch(
      setInitialStep(flowId, {
        id: INITIAL_INDEX,
        isActive: true,
        isAvailable: false,
        isCompleted: false
      })
    );
  }

  const handleSetNextStep = (step, isNextStepExists) => {
    const nextStep = step + 1;

    dispatch(
      setStep(flowId, step, { id: step, isActive: false, isAvailable: true, isCompleted: true })
    );

    if (isNextStepExists) {
      if (!availableSteps.some(item => item.id === nextStep)) {
        dispatch(
          addStep(flowId, { id: nextStep, isActive: false, isAvailable: false, isCompleted: false })
        );
      }
      dispatch(setStepIsActive(flowId, nextStep));
    }
  };

  const handleSetStep = nextStep => {
    if (availableSteps.some(step => step.id === nextStep && step.isAvailable)) {
      dispatch(setStepIsActive(flowId, nextStep));
    }
  };

  return [availableSteps, handleSetStep, handleSetNextStep];
};
