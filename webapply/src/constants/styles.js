import routes from "../routes";

export const sideNavWidthXL = 530;
export const sideNavWidthLG = 475;
export const sideNavWidthMD = 360;
export const sideNavWidthSM = 280;

export const portraitOrientationQueryIPads =
  "@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)";

export const routesToHideHeaderTitle = [routes.accountsComparison, routes.detailedAccount];
export const routerToAddPaddingInSlider = [
  routes.accountsComparison,
  routes.detailedAccount,
  routes.applicationOverview
];
