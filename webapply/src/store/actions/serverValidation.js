export const SET_INPUTS_ERRORS = "SERVER_VALIDATION/SET_INPUTS_ERRORS";
export const PATCH_INPUTS_ERRORS = "SERVER_VALIDATION/PATCH_INPUTS_ERRORS";
export const RESET_INPUTS_ERRORS = "SERVER_VALIDATION/RESET_INPUTS_ERRORS";

export const setInputsErrors = payload => {
  return { type: SET_INPUTS_ERRORS, payload };
};

export const patchInputsErrors = payload => {
  return { type: PATCH_INPUTS_ERRORS, payload };
};

export const resetInputsErrors = () => {
  return { type: RESET_INPUTS_ERRORS };
};
