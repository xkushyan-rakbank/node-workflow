import get from "lodash/get";

import routes from "../../../routes";
import { accountsInfo } from "./constants";

export const getTitleByPathname = (pathname, accountType) =>
  ({
    [routes.detailedAccount]: get(accountsInfo, [accountType, "title"], ""),
    [routes.applicationOverview]: "Opening an account has never been this simple.",
    [routes.MyApplications]: "Your  applications, at a glance",
    [routes.comeBackLogin]: "Good to see you back!",
    [routes.comeBackLoginVerification]: "Confirm that it's you",
    [routes.ApplicationSubmitted]: "Check it out. Application submitted!",
    [routes.reUploadDocuments]: "Edit your application",
    [routes.accountsComparison]: "All businesses start with an account. Get yours now."
  }[pathname]);
