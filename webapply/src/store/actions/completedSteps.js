export const SET_COMPANY_STEPS = "SET_COMPANY_STEPS";
export const SET_SIGNATORY_STEPS = "SET_SIGNATORY_STEPS";
export const ADD_SIGNATORY = "ADD_SIGNATORY";
export const REMOVE_SIGNATORY = "REMOVE_SIGNATORY";

export const setCompanySteps = steps => {
  return { type: SET_COMPANY_STEPS, steps };
};

export const setSignatorySteps = (index, steps) => {
  return { type: SET_SIGNATORY_STEPS, payload: { index, steps } };
};

export const addSignatory = () => {
  return { type: ADD_SIGNATORY };
};

export const removeSignatory = index => {
  return { type: REMOVE_SIGNATORY, index };
};
