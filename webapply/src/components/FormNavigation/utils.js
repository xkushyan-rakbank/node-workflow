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
  [
    routes.accountsComparison,
    routes.comeBackLogin,
    routes.comeBackLoginVerification,
    routes.MyApplications
  ].includes(pathname);

export const checkIsShowSmallMenu = pathname =>
  ![routes.login, routes.detailedAccount, routes.applicationOverview].includes(pathname);
