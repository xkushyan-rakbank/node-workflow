export const SEND_PROSPECT_TO_API = "SEND_PROSPECT_TO_API";
export const SEND_PROSPECT_TO_API_SUCCESS = "SEND_PROSPECT_TO_API_SUCCESS";
export const SEND_PROSPECT_TO_API_FAIL = "SEND_PROSPECT_TO_API_FAIL";
export const RESET_FORM_STEP = "RESET_FORM_STEP";
export const PROSPECT_AUTO_SAVE = "PROSPECT_AUTO_SAVE";

export const sendProspectToAPI = () => {
  return { type: SEND_PROSPECT_TO_API };
};

export const sendProspectToAPISuccess = () => {
  return { type: SEND_PROSPECT_TO_API_SUCCESS };
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
