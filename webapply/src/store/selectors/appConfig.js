export const getUiConfig = state => state.appConfig.uiConfig || {};
/**
 * @param {Store} state
 * @return {Prospect}
 */
export const getProspect = state => state.appConfig.prospect || {};

/**
 * @param {Store} state
 * @return {Signatory[]|[]}
 */
export const getSignatories = state => getProspect(state).signatoryInfo || [];
/**
 * @param {Store} state
 * @return {OrgKYCDetails|{}}
 */
export const getOrgKYCDetails = state => getProspect(state).orgKYCDetails || {};
/**
 * @param {Store} state
 * @return {Object}
 */
export const getGeneralInfo = state => getProspect(state).generalInfo || {};
/**
 * @param {Store} state
 * @return {ApplicantInfo}
 */
export const getApplicantInfo = state => getProspect(state).applicantInfo || {};
/**
 * @param {Store} state
 * @return {String}
 */
export const getProspectId = state => getGeneralInfo(state).prospectId;

export const getProceedStatus = state => state.applicationStatus.isProceed;

export const getScreeningResults = state =>
  state.applicationStatus.screeningResults;
