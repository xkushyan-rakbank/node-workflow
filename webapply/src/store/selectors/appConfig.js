export const getUiConfig = state => state.appConfig.uiConfig || {};

export const getEndpoints = state => state.appConfig.endpoints || {};

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

export const getScreeningResults = state => state.sendProspectToAPI.screeningResults;

export const getLoginParam = state => state.appConfig.login;

export const getIsAgentLoggedIn = state => state.login;

export const getSearchInfo = state => state.appConfig.searchInfo || {};

export const getAccountSubmittedInfo = state => state.appConfig.prospect.accountInfo;

export const getReCaptchaSiteKey = state => state.appConfig.reCaptchaSiteKey;

export const getServicePricingGuideUrl = state => state.appConfig.servicePricingGuideUrl;

export const getUrlsReadMore = state => ({
  rakValuePlusReadMoreUrl: state.appConfig.rakValuePlusReadMoreUrl,
  rakValueMaxReadMoreUrl: state.appConfig.rakValueMaxReadMoreUrl,
  rakValuePlusIslamicReadMoreUrl: state.appConfig.rakValuePlusIslamicReadMoreUrl,
  rakValueMaxIslamicReadMoreUrl: state.appConfig.rakValueMaxIslamicReadMoreUrl
});

export const getProspectDocuments = state => state.appConfig.prospect.documents;

const createGetDocsCountSelector = (filterDocuments = () => true) => state => {
  const documents = getProspectDocuments(state);
  let counter = 0;

  if (documents) {
    counter += (documents.companyDocuments || []).filter(filterDocuments).length;

    Object.values(documents.stakeholdersDocuments || {}).map(stakeholdersDocument => {
      counter += stakeholdersDocument.filter(filterDocuments).length;
    });
  }

  return counter;
};

const UPLOADED_STATE = "Uploaded";

export const getUploadedDocsCount = createGetDocsCountSelector(
  doc => doc.uploadStatus === UPLOADED_STATE
);

export const getRequiredDocsCount = createGetDocsCountSelector();
