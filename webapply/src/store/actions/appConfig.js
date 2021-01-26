import { appendGaEventToAction } from "./googleAnalytics";

export const RECEIVE_APPCONFIG = "RECEIVE_APPCONFIG";
export const RECEIVE_APPCONFIG_SUCCESS = "RECEIVE_APPCONFIG_SUCCESS";
export const RECEIVE_APPCONFIG_FAIL = "RECEIVE_APPCONFIG_FAIL";
export const UPDATE_PROSPECT = "UPDATE_PROSPECT";
export const RESET_PROSPECT = "RESET_PROSPECT";
export const SET_CONFIG = "SET_CONFIG";
export const SET_PROSPECT = "SET_PROSPECT";
export const UPDATE_PROSPECT_ID = "UPDATE_PROSPECT_ID";
export const UPDATE_VIEW_ID = "UPDATE_VIEW_ID";
export const REMOVE_PROSPECT_ID = "REMOVE_PROSPECT_ID";
export const SAVE_SIGNATORY_MODEL = "SAVE_SIGNATORY_MODEL";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const RESET_APPLICANT_INFO = "RESET_APPLICANT_INFO";
export const LOAD_META_DATA = "LOAD_META_DATA";
export const SET_PROSPECT_LEAD = "SET_PROSPECT_LEAD";
export const SET_EXPIRED = "SET_EXPIRED";
export const SET_RO_CODE = "SET_RO_CODE";

export const loadMetaData = (meta = {}) => ({
  type: LOAD_META_DATA,
  payload: meta.freeField5 || ""
});

export const receiveAppConfig = () => ({
  type: RECEIVE_APPCONFIG
});

export const receiveAppConfigSuccess = payload => {
  return { type: RECEIVE_APPCONFIG_SUCCESS, payload };
};

export const receiveAppConfigFail = payload => {
  return { type: RECEIVE_APPCONFIG_FAIL, payload };
};

export const updateProspect = (payload, gaEvent = null) => {
  const action = { type: UPDATE_PROSPECT, payload };

  return appendGaEventToAction(action, gaEvent);
};

export const setConfig = payload => {
  return { type: SET_CONFIG, payload };
};

export const setProspect = payload => {
  return { type: SET_PROSPECT, payload };
};

export const resetProspect = () => {
  return { type: RESET_PROSPECT };
};

export const updateProspectId = payload => {
  return { type: UPDATE_PROSPECT_ID, payload };
};

export const removeProspectId = () => {
  return { type: REMOVE_PROSPECT_ID };
};

export const updateViewId = (viewId, isSendToApi) => {
  return { type: UPDATE_VIEW_ID, payload: { viewId, isSendToApi } };
};

export const saveSignatoryModel = payload => {
  return { type: SAVE_SIGNATORY_MODEL, payload };
};

export const setAccessToken = accessToken => ({ type: SET_ACCESS_TOKEN, payload: accessToken });

export const resetApplicantInfo = () => ({ type: RESET_APPLICANT_INFO });

export const setProspectLead = payload => {
  return { type: SET_PROSPECT_LEAD, payload };
};

export const setRoCode = payload => {
  return { type: SET_RO_CODE, payload };
};

export const setExpired = expired => ({ type: SET_EXPIRED, payload: expired });
