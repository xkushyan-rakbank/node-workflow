export const getUiConfig = state => state.appConfig.uiConfig || {};
/**
 * @param {Store} state
 * @return {Prospect}
 */
export const geProspect = state => state.appConfig.prospect || {};

/**
 * @param {Store} state
 * @return {Signatory[]|[]}
 */
export const getSignatories = state => geProspect(state).signatoryInfo || [];
/**
 * @param {Store} state
 * @return {OrgKYCDetails|{}}
 */
export const getOrgKYCDetails = state => geProspect(state).orgKYCDetails || {};
