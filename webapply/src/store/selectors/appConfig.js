import get from "lodash/get";

export const getUiConfig = state => state.appConfig.uiConfig || {};

export const getEndpoints = state => state.appConfig.endpoints || {};

export const getProspect = state => state.appConfig.prospect || {};

export const getSignatories = state => getProspect(state).signatoryInfo || [];

export const getAccountInfo = state => getProspect(state).accountInfo || [];

export const getAccountNumbers = state => state.accountNumbers;

export const getOrganizationInfo = state => getProspect(state).organizationInfo || [];

export const getOrgKYCDetails = state => getProspect(state).orgKYCDetails || {};

export const getGeneralInfo = state => getProspect(state).generalInfo || {};

export const getApplicantInfo = state => getProspect(state).applicantInfo || {};

export const getSendProspectToAPIInfo = state => state.sendProspectToAPI || {};

export const getIsSendingProspect = state => getSendProspectToAPIInfo(state).loading;

export const getApplicationInfo = state => getProspect(state).applicationInfo || {};

export const getIsIslamicBanking = state => getApplicationInfo(state).islamicBanking;

export const getAccountType = state => getApplicationInfo(state).accountType;

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
    counter += Object.values(documents.stakeholdersDocuments || {})
      .map(
        stakeholdersDocument =>
          get(stakeholdersDocument, "documents", []).filter(filterDocuments).length
      )
      .reduce((acc, item) => acc + item, 0);
  }

  return counter;
};

const UPLOADED_STATE = "Uploaded";

export const getUploadedDocsCount = createGetDocsCountSelector(
  doc => doc.uploadStatus === UPLOADED_STATE
);

export const getRequiredDocsCount = createGetDocsCountSelector();

export const getProspectErrorMessage = state => state.appConfig.prospectError;

export const getLoading = state => state.appConfig.loading;

export const getAuthToken = state => state.appConfig.authorizationToken;

export const getAuthorizationHeader = state => {
  const authToken = getAuthToken(state);

  return {
    headers: { Authorization: `Bearer ${authToken}` }
  };
};

export const getIsRecaptchaEnable = state => state.appConfig.recaptchaEnable;
