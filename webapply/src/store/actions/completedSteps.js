export const ADD_STEP = "ADD_STEP";
export const SET_STEP = "SET_STEP";
export const SET_INITIAL_STEP = "SET_INITIAL_STEP";
export const SET_STEP_IS_ACTIVE = "SET_STEP_IS_ACTIVE";
export const ADD_SIGNATORY = "ADD_SIGNATORY";
export const REMOVE_SIGNATORY = "REMOVE_SIGNATORY";

export const addStep = (flowId, step) => {
  return { type: ADD_STEP, payload: { flowId, step } };
};

export const setStep = (flowId, stepIndex, step) => {
  return { type: SET_STEP, payload: { flowId, stepIndex, step } };
};

export const setInitialStep = (flowId, step) => {
  return { type: SET_INITIAL_STEP, payload: { flowId, step } };
};

export const setStepIsActive = (flowId, stepIndex) => {
  return { type: SET_STEP_IS_ACTIVE, payload: { flowId, stepIndex } };
};

export const addSignatory = signatoryId => {
  return { type: ADD_SIGNATORY, signatoryId };
};

export const removeSignatory = signatoryId => {
  return { type: REMOVE_SIGNATORY, signatoryId };
};
