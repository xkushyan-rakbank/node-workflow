export const SET_STEP_STATUS = "SET_STEP_STATUS";
export const SET_INITIAL_STEPS = "SET_INITIAL_STEPS";
export const REMOVE_SIGNATORY = "REMOVE_SIGNATORY";

export const setStepStatus = (flowId, step, status) => {
  return { type: SET_STEP_STATUS, payload: { flowId, step, status } };
};

export const setInitialSteps = steps => {
  return { type: SET_INITIAL_STEPS, payload: { steps } };
};

export const removeSignatory = signatoryId => {
  return { type: REMOVE_SIGNATORY, payload: { signatoryId } };
};
