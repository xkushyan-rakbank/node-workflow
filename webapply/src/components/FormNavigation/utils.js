import routes from "../../routes";
import {
  applicationOverviewRoutes,
  applicationPersona,
  detailedAccountRoutes
} from "../../constants";

export const checkIsShowSmallBg = pathname =>
  [
    routes.accountsComparison,
    routes.comeBackLogin,
    routes.comeBackLoginVerification,
    routes.MyApplications
  ].includes(pathname);

export const checkIsShowSmallMenu = pathname =>
  ![
    routes.login,
    ...detailedAccountRoutes,
    ...applicationOverviewRoutes,
    ...applicationPersona
  ].includes(pathname);

export const isFooterFixed = pathname => {
  return ![
    ...applicationOverviewRoutes,
    ...applicationPersona,
    routes.verifyMobileOtp,
    routes.verifyEmailOtp,
    routes.congratulations
  ].includes(pathname);
};
