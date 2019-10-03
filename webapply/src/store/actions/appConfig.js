export const RECEIVE_APPCONFIG = "RECEIVE_APPCONFIG";
export const RECEIVE_APPCONFIG_SUCCESS = "RECEIVE_APPCONFIG_SUCCESS";
export const RECEIVE_APPCONFIG_FAIL = "RECEIVE_APPCONFIG_FAIL";
export const UPDATE_PROSPECT = "UPDATE_PROSPECT";
export const SET_PROSPECT = "SET_PROSPECT";
export const UPDATE_PROSPECT_ID = "UPDATE_PROSPECT_ID";

export const receiveAppConfig = () => {
  return { type: RECEIVE_APPCONFIG };
};

export const receiveAppConfigSuccess = data => {
  return { type: RECEIVE_APPCONFIG_SUCCESS, data };
};

export const receiveAppConfigFail = error => {
  return { type: RECEIVE_APPCONFIG_FAIL, error };
};

export const updateProspect = fields => {
  return { type: UPDATE_PROSPECT, fields };
};

export const setProspect = prospect => {
  return { type: SET_PROSPECT, prospect };
};

export const updateProspectId = prospectId => {
  return { type: UPDATE_PROSPECT_ID, prospectId };
};
