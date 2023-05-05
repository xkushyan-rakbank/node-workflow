/* eslint-disable max-len */
import { accountNames } from "../../../constants";
import landingQuickApply from "../../../assets/images/quick-apply.png";
var conditionLink =
  "https://revamp.rakbank.ae/wps/wcm/connect/f48dff64-97b2-4993-ab62-f2c6d9f38fa0/Bonus+Int+%2BRetention+Bonus+-+T%26C+310323.pdf?MOD=AJPERES&CVID=osTpIOq";
if (process.env.REACT_APP_SERVER_ENV === "production") {
  conditionLink =
    "https://rakbank.ae/wps/wcm/connect/f48dff64-97b2-4993-ab62-f2c6d9f38fa0/Bonus+Int+%2BRetention+Bonus+-+T%26C+310323.pdf?MOD=AJPERES&CVID=osTpIOq";
}
const blank = "_blank";
export const accountsInfo = {
  [accountNames.starter]: {
    title: "RAKstarter Account",
    subtitle: "A zero balance account, for startups \n& entrepreneurs.",
    islamicSubtitle: "A zero balance account, for startups \n& entrepreneurs."
  },
  [accountNames.currentAccount]: {
    title: "Business Current Account",
    subtitle: `Earn up to 1.5% bonus interest on your monthly account balance. <a href="${conditionLink}" target="${blank}">Conditions apply</a>.`,
    islamicSubtitle: "Our most flexible account for growing businesses."
  },
  [accountNames.elite]: {
    title: "Business\n Elite\n Account",
    subtitle: "Our most exclusive account, for our most exclusive clients.",
    islamicSubtitle: "Our most exclusive account, for our most exclusive clients."
  },
  comeBackLogin: {
    title: "Good to see you back!"
  },
  comeBackVerification: {
    title: "Confirm that it's you"
  },
  landingPage: {
    title: "Welcome to\n",
    subtitle: "Get started with your \nbanking needs online,\nin minutes!",
    image: landingQuickApply
  }
};
