export const SHOW_INPUT_FIELD = "SHOW_INPUT_FIELD";
export const HIDE_INPUT_FIELD = "HIDE_INPUT_FIELD";
export const ENABLE_INPUT_FIELD = "ENABLE_INPUT_FIELD";
export const DISABLE_INPUT_FIELD = "DISABLE_INPUT_FIELD";
export const DECISIONS_TRIGGERED = "DECISIONS_TRIGGERED";
export const SET_LABEL = "SET_LABEL";
export const GET_DECISIONS = "GET_DECISIONS";

export const showInputField = payload => {
  return { type: SHOW_INPUT_FIELD, payload };
};

export const hideInputFeild = payload => {
  return { type: HIDE_INPUT_FIELD, payload };
};

export const enableInputField = payload => {
  return { type: ENABLE_INPUT_FIELD, payload };
};

export const disableInputFeild = payload => {
  return { type: DISABLE_INPUT_FIELD, payload };
};

export const triggerDecisions = payload => {
  return { type: DECISIONS_TRIGGERED, payload };
};

export const setDecisions = payload => {
  return { type: GET_DECISIONS, payload };
};

export const setLabel = (key, value) => {
  return { type: SET_LABEL, payload: { key, value } };
};
