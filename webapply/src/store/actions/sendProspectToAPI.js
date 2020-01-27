import { WAIT_FOR_ACTION, ERROR_ACTION } from "redux-wait-for-action";

import { NEXT } from "../../constants";

export const SEND_PROSPECT_TO_API = "SEND_PROSPECT_TO_API";
export const SEND_PROSPECT_TO_API_SUCCESS = "SEND_PROSPECT_TO_API_SUCCESS";
export const SEND_PROSPECT_TO_API_FAIL = "SEND_PROSPECT_TO_API_FAIL";
export const RESET_FORM_STEP = "RESET_FORM_STEP";
export const PROSPECT_AUTO_SAVE = "PROSPECT_AUTO_SAVE";
export const START_PROSPECT_AUTO_SAVE = "START_PROSPECT_AUTO_SAVE";
export const SET_SCREENING_ERROR = "SET_SCREENING_ERROR";
export const RESET_SCREENING_ERROR = "RESET_SCREENING_ERROR";
export const SEND_PROSPECT_REQUEST = "SEND_PROSPECT_REQUEST";

export const sendProspectToAPI = () => {
  return { type: SEND_PROSPECT_TO_API };
};

export const sendProspectToAPIPromisify = (saveType = NEXT) => ({
  type: SEND_PROSPECT_TO_API,
  [WAIT_FOR_ACTION]: SEND_PROSPECT_TO_API_SUCCESS,
  [ERROR_ACTION]: SEND_PROSPECT_TO_API_FAIL,
  payload: { saveType }
});

export const sendProspectToAPISuccess = prospectCopy => {
  return { type: SEND_PROSPECT_TO_API_SUCCESS, prospectCopy };
};

export const sendProspectToAPIFail = () => {
  return { type: SEND_PROSPECT_TO_API_FAIL };
};

export const resetFormStep = ({ resetStep }) => {
  return { type: RESET_FORM_STEP, resetStep };
};

export const prospectAutoSave = () => {
  return { type: PROSPECT_AUTO_SAVE };
};

export const startProspectAutoSave = () => {
  return { type: START_PROSPECT_AUTO_SAVE };
};

export const setScreeningError = error => {
  return { type: SET_SCREENING_ERROR, payload: error };
};

export const resetScreeningError = () => {
  return { type: RESET_SCREENING_ERROR };
};

export const sendProspectRequest = (saveType, newProspect) => {
  return { type: SEND_PROSPECT_REQUEST, saveType, newProspect };
};
