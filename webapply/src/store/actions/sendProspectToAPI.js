import { WAIT_FOR_ACTION, ERROR_ACTION, CALLBACK_ARGUMENT } from "redux-wait-for-action";

import { NEXT } from "../../constants";
import { appendGaEventToAction } from "./googleAnalytics";

export const SEND_PROSPECT_TO_API = "SEND_PROSPECT_TO_API";
export const SEND_PROSPECT_TO_API_SUCCESS = "SEND_PROSPECT_TO_API_SUCCESS";
export const SEND_PROSPECT_TO_API_FAIL = "SEND_PROSPECT_TO_API_FAIL";
export const RESET_FORM_STEP = "RESET_FORM_STEP";
export const PROSPECT_AUTO_SAVE = "PROSPECT_AUTO_SAVE";
export const START_PROSPECT_AUTO_SAVE = "START_PROSPECT_AUTO_SAVE";
export const SET_SCREENING_ERROR = "SET_SCREENING_ERROR";
export const RESET_SCREENING_ERROR = "RESET_SCREENING_ERROR";
export const SEND_PROSPECT_REQUEST = "SEND_PROSPECT_REQUEST";

export const sendProspectToAPI = (saveType = NEXT) => {
  return { type: SEND_PROSPECT_TO_API, payload: { saveType } };
};

export const sendProspectToAPIPromisify = (saveType = NEXT, gaEvent = null) => {
  const action = {
    type: SEND_PROSPECT_TO_API,
    [WAIT_FOR_ACTION]: SEND_PROSPECT_TO_API_SUCCESS,
    [ERROR_ACTION]: SEND_PROSPECT_TO_API_FAIL,
    [CALLBACK_ARGUMENT]: action => action.payload,
    payload: { saveType }
  };

  return appendGaEventToAction(action, gaEvent);
};

export const sendProspectToAPISuccess = isScreeningError => {
  return { type: SEND_PROSPECT_TO_API_SUCCESS, payload: isScreeningError };
};

export const sendProspectToAPIFail = error => {
  return { type: SEND_PROSPECT_TO_API_FAIL, error };
};

export const resetFormStep = ({ resetStep }) => {
  return { type: RESET_FORM_STEP, resetStep };
};

export const prospectAutoSave = () => {
  return { type: PROSPECT_AUTO_SAVE };
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
