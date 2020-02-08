import routes from "../../routes";

export const checkIsShowAccountInfo = pathname =>
  [
    routes.accountsComparison,
    routes.detailedAccount,
    routes.applicationOverview,
    routes.MyApplications,
    routes.comeBackLogin,
    routes.comeBackLoginVerification,
    routes.reUploadDocuments,
    routes.ApplicationSubmitted
  ].includes(pathname);

export const checkIsShowSmallBg = pathname =>
  [routes.accountsComparison, routes.comeBackLogin, routes.comeBackLoginVerification].includes(
    pathname
  );

export const checkIsShow = pathname =>
  [
    routes.accountsComparison,
    routes.companyInfo,
    routes.stakeholdersInfo,
    routes.finalQuestions,
    routes.comeBackLogin,
    routes.comeBackLoginVerification,
    routes.reUploadDocuments,
    routes.ApplicationSubmitted,
    routes.uploadDocuments
  ].includes(pathname);
