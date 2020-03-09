import routes from "../routes";
import { applicationOverviewRoutes, detailedAccountRoutes } from "./index";

export const sideNavWidthLG = 530;
export const sideNavWidthMD = 380;
export const sideNavWidthSM = 320;
export const sideNavWidthCollapsed = 146;

export const portraitOrientationQueryIPads =
  "@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)";

export const routerToAddPaddingInSlider = [
  routes.accountsComparison,
  ...detailedAccountRoutes,
  ...applicationOverviewRoutes,
  routes.login,
  routes.comeBackLogin,
  routes.comeBackLoginVerification,
  routes.MyApplications
];
