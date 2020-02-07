import routes from "../../routes";
import { GA_EVENTS } from "../ga";

export const gaEventsMap = {
  [routes.applicationOverview]: GA_EVENTS.PRODUCT_APPLY,
  [routes.applicantInfo]: GA_EVENTS.PRODUCT_START,
  [routes.comeBackLogin]: GA_EVENTS.COMEBACK_START
};
