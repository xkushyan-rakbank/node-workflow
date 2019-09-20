export const RECEIVE_APPCONFIG = "RECEIVE_APPCONFIG";
export const RECEIVE_APPCONFIG_SUCCESS = "RECEIVE_APPCONFIG_SUCCESS";
export const RECEIVE_APPCONFIG_FAIL = "RECEIVE_APPCONFIG_FAIL";
export const UPDATE_FIELD = "UPDATE_FIELD";
export const UPDATE_PROSPECT = "UPDATE_PROSPECT";
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

export const updateField = data => {
  return { type: UPDATE_FIELD, data };
};

export const updateProspect = prospect => {
  return { type: UPDATE_PROSPECT, prospect };
};

export const updateProspectId = prospectId => {
  return { type: UPDATE_PROSPECT_ID, prospectId };
};
