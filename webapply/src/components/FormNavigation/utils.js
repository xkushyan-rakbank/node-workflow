import routes from "../../routes";

export const getIsShowAccountInfo = pathname =>
  [
    routes.accountsComparison,
    routes.detailedAccount,
    routes.applicationOverview,
    routes.MyApplications,
    routes.comeBackLogin,
    routes.comeBackLoginVerification,
    routes.reUploadDocuments
  ].includes(pathname);

export const getIsShowSmallBg = pathname =>
  [routes.accountsComparison, routes.comeBackLogin, routes.comeBackLoginVerification].includes(
    pathname
  );
