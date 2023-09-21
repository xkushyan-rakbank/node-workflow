import get from "lodash/get";

import routes from "../../../routes";
import { accountsInfo } from "./constants";
import {
  applicationOverviewRoutes,
  detailedAccountRoutes,
  personaSelectionRoutes
} from "../../../constants";

export const BBG = process.env.NODE_ENV === "production" ? "/digitalbank" : "";

export const getTitleByPathname = (pathname, accountType) => {
  if (detailedAccountRoutes.includes(pathname))
    return get(accountsInfo, [accountType, "title"], "");

  if (personaSelectionRoutes.includes(pathname))
    return get(accountsInfo, [accountType, "title"], "");

  if (applicationOverviewRoutes.includes(pathname))
    return "Open your account in a few simple steps.";

  return {
    [`${BBG}${routes.MyApplications}`]: "Your  applications, at a glance",
    [`${BBG}${routes.comeBackLogin}`]: "Good to see you back!",
    [`${BBG}${routes.comeBackLoginVerification}`]: "Confirm that it's you",
    [`${BBG}${routes.verifyOtp}`]: "Confirm that it's you",
    [`${BBG}${routes.ApplicationSubmitted}`]: "Check it out. Application submitted!",
    [`${BBG}${routes.congratulations}`]: "Check it out. Application submitted!",
    [`${BBG}${routes.reUploadDocuments}`]: "Upload your documents",
    [`${BBG}${routes.quickapplyLanding}`]: "All businesses start with an account. Get yours now."
    //[routes.quickapplyLanding]: "Welcome to Quick Apply!"
  }[pathname];
};
