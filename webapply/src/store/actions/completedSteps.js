export const SET_COMPLETED_STEPS = "SET_COMPLETED_STEPS";
export const ADD_SIGNATORY = "ADD_SIGNATORY";
export const REMOVE_SIGNATORY = "REMOVE_SIGNATORY";

// export const setCompletedSteps = (path, steps) => {
//   return { type: SET_COMPLETED_STEPS, payload: { path, steps } };
// };

export const setCompletedSteps = (id, steps) => {
  return { type: SET_COMPLETED_STEPS, payload: { id, steps } };
};

export const addSignatory = () => {
  return { type: ADD_SIGNATORY };
};

export const removeSignatory = index => {
  return { type: REMOVE_SIGNATORY, index };
};
