import routes from "../../routes";

export const VISIBLE_FOR_CHAT_ROUTES = [
  routes.SearchedAppInfo,
  routes.SubmitApplication,
  routes.login,
  routes.searchProspect,
  routes.selectServices,
  routes.reUploadDocuments,
  routes.uploadDocuments,
  routes.finalQuestions,
  routes.stakeholdersInfo,
  routes.companyInfo,
  routes.MyApplications
];

export const NON_VISIBLE_FOR_CHAT_ROUTES = [
  routes.accountsComparison,
  routes.detailedAccount,
  routes.applicationOverview,
  routes.applicantInfo,
  routes.verifyOtp,
  routes.comeBackLogin,
  routes.comeBackLoginVerification
];
