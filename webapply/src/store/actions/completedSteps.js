export const SET_COMPANY_STEPS_COMPLETE = "SET_COMPANY_STEPS_COMPLETE";
export const SET_SIGNATORY_STEPS_COMPLETE = "SET_SIGNATORY_STEPS_COMPLETE";
export const ADD_SIGNATORY = "ADD_SIGNATORY";
export const REMOVE_SIGNATORY = "REMOVE_SIGNATORY";

export const setCompanyStepsComplete = value => {
  return { type: SET_COMPANY_STEPS_COMPLETE, value };
};

export const setSignatoryStepsComplete = (index, value) => {
  return { type: SET_SIGNATORY_STEPS_COMPLETE, payload: { index, value } };
};

export const addSignatory = () => {
  return { type: ADD_SIGNATORY };
};

export const removeSignatory = index => {
  return { type: REMOVE_SIGNATORY, index };
};
