export const getUiConfig = state => state.appConfig.uiConfig || {};

export const getProspect = state => state.appConfig.prospect || {};

export const getSignatories = state => getProspect(state).signatoryInfo || [];

export const getAccountInfo = state => getProspect(state).accountInfo || [];

export const getOrganizationInfo = state => getProspect(state).organizationInfo || [];

export const getOrgKYCDetails = state => getProspect(state).orgKYCDetails || {};

export const getIndustryMultiSelect = state => getOrgKYCDetails(state).industryMultiSelect || [];

export const getGeneralInfo = state => getProspect(state).generalInfo || {};

export const getApplicantInfo = state => getProspect(state).applicantInfo || {};

export const getSendProspectToAPIInfo = state => state.sendProspectToAPI || {};

export const getApplicationInfo = state => getProspect(state).applicationInfo || {};

export const getProspectId = state => getGeneralInfo(state).prospectId;

export const getProceedStatus = state => state.applicationStatus.isProceed;

export const getServerErrorStatus = state => state.applicationStatus.serverErorr;

export const getScreeningResults = state => state.applicationStatus.screeningResults;

export const getLoginParam = state => state.appConfig.login;

export const getIsAgentLoggedIn = state => state.login;

export const getSearchInfo = state => state.appConfig.searchInfo || {};

export const getAccountSubmittedInfo = state => state.appConfig.prospect.accountInfo;

export const getReCaptchaSiteKey = state => state.appConfig.reCaptchaSiteKey;
