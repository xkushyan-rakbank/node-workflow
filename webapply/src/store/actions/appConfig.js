import { appendGaEventToAction } from "./googleAnalytics";

export const RECEIVE_APPCONFIG = "RECEIVE_APPCONFIG";
export const RECEIVE_APPCONFIG_SUCCESS = "RECEIVE_APPCONFIG_SUCCESS";
export const RECEIVE_APPCONFIG_FAIL = "RECEIVE_APPCONFIG_FAIL";
export const UPDATE_PROSPECT = "UPDATE_PROSPECT";
export const RESET_PROSPECT = "RESET_PROSPECT";
export const SET_CONFIG = "SET_CONFIG";
export const SET_PROSPECT = "SET_PROSPECT";
export const UPDATE_PROSPECT_ID = "UPDATE_PROSPECT_ID";
export const UPDATE_ACTION_TYPE = "UPDATE_ACTION_TYPE";
export const UPDATE_VIEW_ID = "UPDATE_VIEW_ID";
export const REMOVE_PROSPECT_ID = "REMOVE_PROSPECT_ID";
export const UPDATE_SAVE_TYPE = "UPDATE_SAVE_TYPE";
export const SAVE_PROSPECT_MODEL = "SAVE_PROSPECT_MODEL";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const RESET_APPLICANT_INFO = "RESET_APPLICANT_INFO";
export const LOAD_META_DATA = "LOAD_META_DATA";

export const loadMetaData = (meta = {}) => ({
  type: LOAD_META_DATA,
  payload: meta.freeField5 || ""
});

export const receiveAppConfig = accountType => {
  return { type: RECEIVE_APPCONFIG, payload: { accountType } };
};

export const receiveAppConfigSuccess = data => {
  return { type: RECEIVE_APPCONFIG_SUCCESS, data };
};

export const receiveAppConfigFail = error => {
  return { type: RECEIVE_APPCONFIG_FAIL, error };
};

export const updateProspect = (fields, gaEvent = null) => {
  const action = { type: UPDATE_PROSPECT, fields };

  return appendGaEventToAction(action, gaEvent);
};

export const setConfig = payload => {
  return { type: SET_CONFIG, payload };
};

export const setProspect = prospect => {
  return { type: SET_PROSPECT, prospect };
};

export const resetProspect = () => {
  return { type: RESET_PROSPECT };
};

export const updateProspectId = prospectId => {
  return { type: UPDATE_PROSPECT_ID, prospectId };
};

export const removeProspectId = () => {
  return { type: REMOVE_PROSPECT_ID };
};

export const updateViewId = (viewId, isSendToApi) => {
  return { type: UPDATE_VIEW_ID, payload: { viewId, isSendToApi } };
};

export const saveProspectModel = prospectModel => {
  return { type: SAVE_PROSPECT_MODEL, prospectModel };
};

export const setAccessToken = accessToken => ({ type: SET_ACCESS_TOKEN, payload: accessToken });

export const resetApplicantInfo = () => ({ type: RESET_APPLICANT_INFO });
