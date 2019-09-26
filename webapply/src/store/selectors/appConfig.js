export const getUiConfig = state => state.appConfig.uiConfig || {};

export const getProspect = state => state.appConfig.prospect || {};

export const getSignatories = state => getProspect(state).signatoryInfo || [];

export const getOrgKYCDetails = state => getProspect(state).orgKYCDetails || {};

export const getGeneralInfo = state => getProspect(state).generalInfo || {};

export const getApplicantInfo = state => getProspect(state).applicantInfo || {};

export const getApplicationInfo = state => getProspect(state).applicationInfo || {};

export const getProspectId = state => getGeneralInfo(state).prospectId;

export const getProceedStatus = state => state.applicationStatus.isProceed;

export const getServerErrorStatus = state => state.applicationStatus.serverErorr;

export const getScreeningResults = state => state.applicationStatus.screeningResults;
