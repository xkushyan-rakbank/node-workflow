import { WAIT_FOR_ACTION } from "redux-wait-for-action";

import { UPDATE_SAVE_TYPE } from "./appConfig";

export const SEND_PROSPECT_TO_API = "SEND_PROSPECT_TO_API";
export const SEND_PROSPECT_TO_API_SUCCESS = "SEND_PROSPECT_TO_API_SUCCESS";
export const SEND_PROSPECT_TO_API_FAIL = "SEND_PROSPECT_TO_API_FAIL";
export const RESET_FORM_STEP = "RESET_FORM_STEP";
export const PROSPECT_AUTO_SAVE = "PROSPECT_AUTO_SAVE";
export const START_PROSPECT_AUTO_SAVE = "START_PROSPECT_AUTO_SAVE";

export const sendProspectToAPI = () => {
  return { type: SEND_PROSPECT_TO_API };
};

export const sendProspectToAPIPromisify = () => {
  return {
    type: SEND_PROSPECT_TO_API,
    [WAIT_FOR_ACTION]: action => action.type === UPDATE_SAVE_TYPE && action.saveType === "continue"
  };
};

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
