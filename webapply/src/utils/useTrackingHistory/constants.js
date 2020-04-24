import routes from "../../routes";
import { GA_EVENTS } from "../ga";
import { applicationOverviewRoutes, detailedAccountRoutes } from "../../constants";

export const gaEventsMap = {
  ...detailedAccountRoutes.reduce(
    (acc, route) => ({ ...acc, [acc[route]]: GA_EVENTS.PRODUCT_PAGE }),
    {}
  ),
  ...applicationOverviewRoutes.reduce(
    (acc, route) => ({ ...acc, [acc[route]]: GA_EVENTS.PRODUCT_APPLY }),
    {}
  ),
  [routes.applicantInfo]: GA_EVENTS.PRODUCT_START,
  [routes.comeBackLogin]: GA_EVENTS.COMEBACK_START,
  [routes.stakeholdersInfo]: GA_EVENTS.COMPANY_INFORMATION_SUBMITTED,
  [routes.finalQuestions]: GA_EVENTS.COMPANY_STAKEHOLDER_SUBMITTED,
  [routes.SubmitApplication]: GA_EVENTS.SELECT_SERVICE_SUBMITTED,
  [routes.comeBackLoginVerification]: GA_EVENTS.COMEBACK_OTP_SUBMITTED,
  [routes.companyInfo]: GA_EVENTS.PRODUCT_OTP_SUBMITTED,
  [routes.verifyOtp]: GA_EVENTS.PRODUCT_BASIC_INFORMATION,
  [routes.ApplicationSubmitted]: GA_EVENTS.FORM_SUBMITTED
};
