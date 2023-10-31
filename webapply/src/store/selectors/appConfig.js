import get from "lodash/get";

import { UPLOADED } from "../../constants";

export const getAgentName = state => state.appConfig.login.userName;

export const getAppConfig = state => state.appConfig || {};

export const getAppConfigLoading = state => getAppConfig(state).loading;

export const getUploadDocuments = state => state.uploadDocuments || {};

export const getDatalist = state => getAppConfig(state).datalist || {};

export const getSignatoryModel = state => getAppConfig(state).signatoryModel || {};

export const getOrganizationInfoModel = state => getAppConfig(state).organizationInfoModel || {};

export const getReCaptchaSiteKey = state => getAppConfig(state).reCaptchaSiteKey;

export const getIsRecaptchaEnable = state => getAppConfig(state).recaptchaEnable;

export const getServicePricingGuideUrl = state => getAppConfig(state).servicePricingGuideUrl;

export const getAuthToken = state => getAppConfig(state).authorizationToken;

export const getProspect = state => getAppConfig(state).prospect || {};

export const getInitialProspectTableCheck = state => getAppConfig(state).initialProspectTableCheck;

export const getSignatories = state => getProspect(state).signatoryInfo || [];

export const getInitialKycEditCheck = state => getAppConfig(state).iskycInitialEdit;

export const getSignatoriesCount = state => getSignatories(state).length;

export const getAccountInfo = state => getProspect(state).accountInfo || [];

export const getAccountCurrencies = state => get(getAccountInfo(state)[0], "accountCurrencies", "");

export const getExpressTandC = state => get(getAccountInfo(state)[0], "expressTandC", false);

export const getOrganizationInfo = state => getProspect(state).organizationInfo || {};

export const getKycAnnexureDetails = state => getProspect(state).kycAnnexure || {};

export const getPrimaryMobCountryCode = state =>
  get(getOrganizationInfo(state), "contactDetails.primaryMobCountryCode", "");

export const getCompanyName = state => getOrganizationInfo(state).companyName;

export const getCompanyTradeLicenseNumber = state => getOrganizationInfo(state).licenseOrCOINumber;

export const getOrgKYCDetails = state => getProspect(state).orgKYCDetails || {};

export const getGeneralInfo = state => getProspect(state).generalInfo || {};

export const getProspectId = state => getGeneralInfo(state).prospectId || "";

export const getApplicantInfo = state => getProspect(state).applicantInfo || {};

export const getApplicantFullName = state => getApplicantInfo(state).fullName;

export const getApplicantEditedFullName = state => getSignatories(state)[0].editedFullName;

export const getApplicantEmail = state => getApplicantInfo(state).email;

export const getRoEmail = state => getAppConfig(state).roEmail;

// ro-assist-brd3-3
export const getValidRoCode = state => {
  const validRoCode = getApplicantInfo(state).validRoCode || "N";
  return validRoCode === "Y" ? true : false;
};

export const getApplicationInfo = state => getProspect(state).applicationInfo || {};

export const getIsIslamicBanking = state => getApplicationInfo(state).islamicBanking;

export const getAccountType = state => getApplicationInfo(state).accountType;

export const getRakValuePackage = state => getApplicationInfo(state).rakValuePackage || "";

export const getDocuments = state => getProspect(state).documents || {};

export const getCompanyDocuments = state => getDocuments(state).companyDocuments || [];

export const getCompanyBankStatements = state => getDocuments(state).companyBankStatements || [];

export const getCompanyAddressProof = state => getDocuments(state).companyAddressProof || [];

export const getCompanyInvoices = state => getDocuments(state).companyInvoices || [];

export const getDocumentUplaoderjwtToken = state =>
  getUploadDocuments(state).authToken?.jwtToken || null;

export const getDocumentUplaoderAuthToken = state =>
  getUploadDocuments(state).authToken?.token || null;

export const getDocumentsList = state => getUploadDocuments(state).documentList || null;

export const getDocumentUploadCnt = state => {
  const companyDocuments = getCompanyDocuments(state);
  let DocumentUploadCnt = 0;
  if (companyDocuments[0]) {
    DocumentUploadCnt = companyDocuments[0].DocumentUploadCnt;
  }
  return DocumentUploadCnt;
};

export const getStakeholdersDocuments = state => getDocuments(state).stakeholdersDocuments || [];

export const getOtherDocuments = state => getDocuments(state).otherDocuments || [];

export const checkIfRequiredDocsUploaded = docs =>
  docs.length && docs.filter(doc => doc.required).every(doc => doc.uploadStatus === UPLOADED);

export const getIsRequiredDocsUploaded = state => {
  // ro-assist-brd3-3 starts
  if (getValidRoCode(state)) {
    return true;
  }
  // // ro-assist-brd3-3 end
  const { companyDocuments, stakeholdersDocuments } = getDocuments(state);
  // ro-assist-brd2-1
  const companyBankStatements = getCompanyBankStatements(state).documents || [];
  const companyAddressProof = getCompanyAddressProof(state).documents || [];
  const companyInvoices = getCompanyInvoices(state).documents || [];
  const stakeholdersDocsFlattened = Object.values(stakeholdersDocuments || {}).reduce(
    (acc, { documents, personalBankStatements, personalBackground }) => [
      ...acc,
      ...documents,
      ...(personalBankStatements ? personalBankStatements.documents : []),
      ...(personalBackground ? personalBackground.documents : [])
    ],
    []
  );

  return checkIfRequiredDocsUploaded([
    ...(companyDocuments || []),
    ...companyBankStatements,
    ...companyAddressProof,
    ...companyInvoices,
    ...stakeholdersDocsFlattened
  ]);
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

export const getDocuploaderHeader = state => {
  const authToken = getDocumentUplaoderAuthToken(state);

  return {
    headers: authToken ? { Authorization: `${authToken}` } : {}
  };
};

export const createGetAuthorityTypeDisplayText = authorityType => state => {
  const authorityTypeFromDatalist =
    getDatalist(state).authorityType.find(item => item.value === authorityType) || {};

  return authorityTypeFromDatalist.displayText || "";
};

export const getLeadSource = state => {
  return typeof state.appConfig.leadSource !== "undefined"
    ? state.appConfig.leadSource.productName
    : "";
};

export const getRoCode = state => {
  return typeof state.appConfig.roCode !== "undefined" ? state.appConfig.roCode : "";
};

export const getExpired = state => getAppConfig(state).expired;

export const getIsLemniskEnable = state => {
  return typeof state.appConfig.lemniskEnable !== "undefined"
    ? state.appConfig.lemniskEnable
    : false;
};

export const getCompanyAdditionalInfo = state => getProspect(state).companyAdditionalInfo || {};

export const isFieldTouched = id => state => getProspect(state).fields?.[id]?.touched;

export const isDecisionLoading = state => getAppConfig(state).decisionLoading;

export const getAdditionalInfoDetailsFromBPM = state =>
  getProspect(state).notifyApplicationRequest?.additionalInfoDetailsFromBPM;

export const getAdditionalDocumentDetailsFromBPM = state =>
  getProspect(state).notifyApplicationRequest?.additionalDocumentDetailsFromBPM;

export const getAdditionalInfoDetailsForBPM = state =>
  getProspect(state).additionalDataForBPM?.additionalInfoBPM || [];

export const getAdditionalDocumentDetailsForBPM = state =>
  getProspect(state).additionalDataForBPM?.additionalDocumentsBPM || [];

export const getSearchInputDetails = state => getAppConfig(state).searchInfo;

export const getAccordionStatuses = state => getProspect(state).accordionsStatus || "{}";

export const getTat = state => {
  return typeof state.appConfig.tat !== "undefined" ? state.appConfig.tat : "";
};

export const getIsAutoSaveEnabled = state => getDatalist(state)?.AutoSave;
