export const getSendProspectToAPIInfo = state => state.sendProspectToAPI || {};

export const getIsSendingProspect = state => getSendProspectToAPIInfo(state).loading;

export const getScreeningError = state => getSendProspectToAPIInfo(state).screeningError;

export const getProspectAutoSaveHash = state =>
  getSendProspectToAPIInfo(state).prospectAutoSaveHash;
