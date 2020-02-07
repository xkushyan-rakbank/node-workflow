import { accountNames } from "../../constants";
import routes from "../../routes";
import { GA_EVENTS } from "../../utils/ga";

export const accountsInfo = {
  [accountNames.starter]: {
    title: "RAKstarter account",
    subtitle: "A zero balance account, for startups \n& entrepreneurs.",
    islamicSubtitle: "A zero balance account, for startups \n& entrepreneurs."
  },
  [accountNames.currentAccount]: {
    title: "Business Current Account",
    subtitle: "Our most flexible account for growing businesses.",
    islamicSubtitle: "Our most flexible account for growing businesses."
  },
  [accountNames.elite]: {
    title: "RAKelite Business Account",
    subtitle: "Our most exclusive account, for our most exclusive clients.",
    islamicSubtitle: "Our most exclusive account, for our most exclusive clients."
  },
  comeBackLogin: {
    title: "Good to see you back!"
  },
  comeBackVerification: {
    title: "Confirm that it's you"
  }
};

export const gaEventsMap = {
  [routes.applicationOverview]: GA_EVENTS.PRODUCT_APPLY,
  [routes.applicantInfo]: GA_EVENTS.PRODUCT_START,
  [routes.comeBackLogin]: GA_EVENTS.COMEBACK_START
};
