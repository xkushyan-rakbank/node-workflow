import routes from "../../routes";
import { applicationOverviewRoutes, detailedAccountRoutes } from "../../constants";

export const checkIsShowAccountInfo = pathname =>
  [
    routes.accountsComparison,
    ...detailedAccountRoutes,
    ...applicationOverviewRoutes,
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
  ![routes.login, ...detailedAccountRoutes, ...applicationOverviewRoutes].includes(pathname);
