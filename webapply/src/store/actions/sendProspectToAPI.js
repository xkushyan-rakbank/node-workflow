import { WAIT_FOR_ACTION, ERROR_ACTION, CALLBACK_ARGUMENT } from "redux-wait-for-action";

import { NEXT, SAVE } from "../../constants";
import { appendGaEventToAction } from "./googleAnalytics";

export const SEND_PROSPECT_TO_API = "SEND_PROSPECT_TO_API";
export const SEND_PROSPECT_TO_API_SUCCESS = "SEND_PROSPECT_TO_API_SUCCESS";
export const SEND_PROSPECT_TO_API_FAIL = "SEND_PROSPECT_TO_API_FAIL";
export const RESET_FORM_STEP = "RESET_FORM_STEP";
export const PROSPECT_AUTO_SAVE = "PROSPECT_AUTO_SAVE";
export const SET_SCREENING_ERROR = "SET_SCREENING_ERROR";
export const RESET_SCREENING_ERROR = "RESET_SCREENING_ERROR";
export const SEND_PROSPECT_REQUEST = "SEND_PROSPECT_REQUEST";
export const PROSPECT_SAVE_ONCLICK = "PROSPECT_SAVE_ONCLICK";
export const SEND_PROSPECT_TO_API_AUTO_SAVE_SUCCESS = "SEND_PROSPECT_TO_API_AUTO_SAVE_SUCCESS";

export const sendProspectToAPI = (saveType = NEXT, actionType = SAVE) => {
  return { type: SEND_PROSPECT_TO_API, payload: { saveType, actionType } };
};

export const sendProspectToAPIPromisify = (
  saveType = NEXT,
  gaEvent = null,
  actionType = SAVE,
  step = null
) => {
  const action = {
    type: SEND_PROSPECT_TO_API,
    [WAIT_FOR_ACTION]: SEND_PROSPECT_TO_API_SUCCESS,
    [ERROR_ACTION]: SEND_PROSPECT_TO_API_FAIL,
    [CALLBACK_ARGUMENT]: action => action.payload,
    payload: { saveType, actionType, step }
  };

  return appendGaEventToAction(action, gaEvent);
};

export const prospectSaveOnClickPromisfy = (saveType = NEXT, gaEvent = null, actionType = SAVE) => {
  const action = {
    type: PROSPECT_SAVE_ONCLICK,
    [WAIT_FOR_ACTION]: SEND_PROSPECT_TO_API_AUTO_SAVE_SUCCESS,
    [ERROR_ACTION]: SEND_PROSPECT_TO_API_FAIL,
    [CALLBACK_ARGUMENT]: action => action.payload,
    payload: { saveType, actionType }
  };

  return appendGaEventToAction(action, gaEvent);
};
export const sendProspectToAPISuccess = isScreeningError => {
  return { type: SEND_PROSPECT_TO_API_SUCCESS, payload: isScreeningError };
};

export const sendProspectToAPIAutoSaveSuccess = isScreeningError => {
  return { type: SEND_PROSPECT_TO_API_AUTO_SAVE_SUCCESS, payload: isScreeningError };
};

export const sendProspectToAPIFail = () => {
  return { type: SEND_PROSPECT_TO_API_FAIL };
};

export const resetFormStep = isResetStep => {
  return { type: RESET_FORM_STEP, payload: isResetStep };
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

export const prospectSaveOnClick = () => {
  return { type: PROSPECT_SAVE_ONCLICK };
};

export const sendProspectRequest = (
  newProspect,
  saveType = NEXT,
  actionType = SAVE,
  step = null
) => {
  return { type: SEND_PROSPECT_REQUEST, payload: { saveType, actionType, newProspect, step } };
};
