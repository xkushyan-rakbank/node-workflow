import get from "lodash/get";

import routes from "../../../routes";
import { accountsInfo } from "./constants";
import {
  applicationOverviewRoutes,
  detailedAccountRoutes,
  personaSelectionRoutes
} from "../../../constants";

export const getTitleByPathname = (pathname, accountType) => {
  if (detailedAccountRoutes.includes(pathname))
    return get(accountsInfo, [accountType, "title"], "");

  if (personaSelectionRoutes.includes(pathname))
    return get(accountsInfo, [accountType, "title"], "");

  if (applicationOverviewRoutes.includes(pathname))
    return "Open your account in a few simple steps.";

  return {
    [`${routes.MyApplications}`]: "Your  applications, at a glance",
    [`${routes.comeBackLogin}`]: "Good to see you back!",
    [`${routes.comeBackLoginVerification}`]: "Confirm that it's you",
    [`${routes.verifyOtp}`]: "Confirm that it's you",
    [`${routes.ApplicationSubmitted}`]: "That's it. You're done!",
    [`${routes.congratulations}`]: "That's it. You're done!",
    [`${routes.reUploadDocuments}`]: "Upload your documents",
    [`${routes.quickapplyLanding}`]: "All businesses start with an account. Get yours now."
    //[routes.quickapplyLanding]: "Welcome to Quick Apply!"
  }[pathname];
};
