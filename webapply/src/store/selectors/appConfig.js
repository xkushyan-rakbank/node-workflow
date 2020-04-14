import { UPLOADED } from "../../constants";

export const getAppConfig = state => state.appConfig || {};

export const getDatalist = state => getAppConfig(state).datalist || {};

export const getAuthorityTypeDatalist = state => getDatalist(state).authorityType || [];

export const getSignatoryModel = state => getAppConfig(state).signatoryModel || {};

export const getReCaptchaSiteKey = state => getAppConfig(state).reCaptchaSiteKey;

export const getIsRecaptchaEnable = state => getAppConfig(state).recaptchaEnable;

export const getServicePricingGuideUrl = state => getAppConfig(state).servicePricingGuideUrl;

export const getAuthToken = state => getAppConfig(state).authorizationToken;

export const getProspect = state => getAppConfig(state).prospect || {};

export const getSignatories = state => getProspect(state).signatoryInfo || [];

export const getSignatoriesCount = state => getSignatories(state).length;

export const getAccountInfo = state => getProspect(state).accountInfo || [];

export const getOrganizationInfo = state => getProspect(state).organizationInfo || {};

export const getCompanyName = state => getOrganizationInfo(state).companyName;

export const getOrgKYCDetails = state => getProspect(state).orgKYCDetails || {};

export const getGeneralInfo = state => getProspect(state).generalInfo || {};

export const getProspectId = state => getGeneralInfo(state).prospectId;

export const getApplicantInfo = state => getProspect(state).applicantInfo || {};

export const getApplicantFullName = state => getApplicantInfo(state).fullName;

export const getApplicationInfo = state => getProspect(state).applicationInfo || {};

export const getIsIslamicBanking = state => getApplicationInfo(state).islamicBanking;

export const getAccountType = state => getApplicationInfo(state).accountType;

export const getDocuments = state => getProspect(state).documents || {};

export const getCompanyDocuments = state => getDocuments(state).companyDocuments || [];

export const getStakeholdersDocuments = state => getDocuments(state).stakeholdersDocuments || [];

export const getOtherDocuments = state => getDocuments(state).otherDocuments || [];

export const checkIfRequiredDocsUploaded = docs =>
  docs.length && docs.filter(doc => doc.required).every(doc => doc.uploadStatus === UPLOADED);

export const getIsRequiredDocsUploaded = state => {
  const { companyDocuments, stakeholdersDocuments } = getDocuments(state);
  const stakeholdersDocsFlattened = Object.values(stakeholdersDocuments || {}).reduce(
    (acc, { documents }) => [...acc, ...documents],
    []
  );

  return checkIfRequiredDocsUploaded([...(companyDocuments || []), ...stakeholdersDocsFlattened]);
};

export const getUrlsReadMore = state => ({
  rakValuePlusReadMoreUrl: getAppConfig(state).rakValuePlusReadMoreUrl,
  rakValueMaxReadMoreUrl: getAppConfig(state).rakValueMaxReadMoreUrl,
  rakValuePlusIslamicReadMoreUrl: getAppConfig(state).rakValuePlusIslamicReadMoreUrl,
  rakValueMaxIslamicReadMoreUrl: getAppConfig(state).rakValueMaxIslamicReadMoreUrl
});

export const getAuthorizationHeader = state => {
  const authToken = getAuthToken(state);

  return {
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
  };
};
