export const SET_STEP_STATUS = "SET_STEP_STATUS";
export const SET_STEPS_STATUS = "SET_STEPS_STATUS";
export const SET_INITIAL_STEPS = "SET_INITIAL_STEPS";
export const REMOVE_SIGNATORY = "REMOVE_SIGNATORY";
export const RESET_STEPS = "RESET_STEPS";

export const setStepStatus = (flowId, step, status) => {
  return { type: SET_STEP_STATUS, payload: { flowId, step, status } };
};

export const setStepsStatus = (steps, status) => {
  return { type: SET_STEPS_STATUS, payload: { steps, status } };
};

export const setInitialSteps = steps => {
  return { type: SET_INITIAL_STEPS, payload: { steps } };
};

export const removeSignatory = signatoryId => {
  return { type: REMOVE_SIGNATORY, payload: { signatoryId } };
};

export const resetSteps = (flowId, steps) => {
  return { type: RESET_STEPS, payload: { steps, flowId } };
};
