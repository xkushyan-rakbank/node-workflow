import get from "lodash/get";

import { COMPANY_SIGNATORY_ID } from "../../containers/FinalQuestions/components/SignatorySummaryCard/constants";
import { FINAL_QUESTIONS_COMPANY_ID } from "../../containers/FinalQuestions/components/CompanySummaryCard/constants";

export const getDatalist = state => state.appConfig.datalist || {};

export const getEndpoints = state => state.appConfig.endpoints || {};

export const getProspect = state => state.appConfig.prospect || {};

export const getSignatories = state => getProspect(state).signatoryInfo || [];

export const getAccountInfo = state => getProspect(state).accountInfo || [];

export const getAccountNumbers = state => state.accountNumbers;

export const getOrganizationInfo = state => getProspect(state).organizationInfo || {};

export const getOrgKYCDetails = state => getProspect(state).orgKYCDetails || {};

export const getIsCompanyStakeholder = state => getOrgKYCDetails(state).isShareholderACompany;

export const getGeneralInfo = state => getProspect(state).generalInfo || {};

export const getApplicantInfo = state => getProspect(state).applicantInfo || {};

export const getSendProspectToAPIInfo = state => state.sendProspectToAPI || {};

export const getIsSendingProspect = state => getSendProspectToAPIInfo(state).loading;

export const getScreeningError = state => getSendProspectToAPIInfo(state).screeningError;

export const getApplicationInfo = state => getProspect(state).applicationInfo || {};

export const getIsIslamicBanking = state => getApplicationInfo(state).islamicBanking;

export const getAccountType = state => getApplicationInfo(state).accountType;

export const getCompanySteps = state =>
  state.completedSteps.filter(item => item.flowId === FINAL_QUESTIONS_COMPANY_ID) || [];

export const getSignatoriesSteps = state =>
  state.completedSteps.filter(item => item.flowId.includes(COMPANY_SIGNATORY_ID)) || [];

export const getProspectId = state => getGeneralInfo(state).prospectId;

export const getAgentLogin = state => state.login;

export const getIsAgentLoggedIn = state => getAgentLogin(state).loginStatus;

export const getReCaptchaSiteKey = state => state.appConfig.reCaptchaSiteKey;

export const getServicePricingGuideUrl = state => state.appConfig.servicePricingGuideUrl;

export const getUrlsReadMore = state => ({
  rakValuePlusReadMoreUrl: state.appConfig.rakValuePlusReadMoreUrl,
  rakValueMaxReadMoreUrl: state.appConfig.rakValueMaxReadMoreUrl,
  rakValuePlusIslamicReadMoreUrl: state.appConfig.rakValuePlusIslamicReadMoreUrl,
  rakValueMaxIslamicReadMoreUrl: state.appConfig.rakValueMaxIslamicReadMoreUrl
});

export const getProspectDocuments = state => state.appConfig.prospect.documents;
export const getOtherDocuments = state => getProspectDocuments(state).otherDocuments || [];
export const isLoadingDocuments = state => state.uploadDocuments.isLoading;

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

export const getAuthToken = state => state.appConfig.authorizationToken;

export const getAuthorizationHeader = state => {
  const authToken = getAuthToken(state);

  return {
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
  };
};

export const getIsRecaptchaEnable = state => state.appConfig.recaptchaEnable;
