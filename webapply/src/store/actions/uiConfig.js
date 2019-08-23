export const RECEIVE_UICONFIG = "RECEIVE_UICONFIG";
export const RECEIVE_UICONFIG_SUCCESS = "RECEIVE_UICONFIG_SUCCESS";
export const RECEIVE_UICONFIG_FAIL = "RECEIVE_UICONFIG_FAIL";

export const reciveUiConfig = () => {
  return { type: RECEIVE_UICONFIG };
};

export const reciveUiConfigSuccess = () => {
  return { type: RECEIVE_UICONFIG_SUCCESS };
};

export const reciveUiConfigFail = error => {
  return { type: RECEIVE_UICONFIG_FAIL, error };
};
