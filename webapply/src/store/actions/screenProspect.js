export const SCREEN_PROSPECT_SEND = "SCREEN_PROSPECT/SEND";
export const SCREEN_PROSPECT_REQUEST = "SCREEN_PROSPECT/REQUEST";
export const SCREEN_PROSPECT_SUCCESS = "SCREEN_PROSPECT/SUCCESS";
export const SCREEN_PROSPECT_RESET = "SCREEN_PROSPECT/RESET";

export const screenProspect = prospectId => ({
  type: SCREEN_PROSPECT_SEND,
  payload: { prospectId }
});

export const screenProspectRequest = prospectId => ({
  type: SCREEN_PROSPECT_REQUEST,
  payload: { prospectId }
});

export const screenProspectSuccess = (prospectId, screeningResult) => ({
  type: SCREEN_PROSPECT_SUCCESS,
  payload: { prospectId, screeningResult }
});

export const screenProspectReset = prospectId => ({
  type: SCREEN_PROSPECT_RESET,
  payload: { prospectId }
});
