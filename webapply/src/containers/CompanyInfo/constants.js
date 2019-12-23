import { CompanyDetails } from "./components/CompanyDetails";
import { Industry } from "./components/Industry";
import { LicenseInformation } from "./components/LicenseInformation";
import callbackRegular from "./../../assets/gif/callback_regular.gif";
import declinedRegular from "./../../assets/gif/declined_regular.gif";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;

export const companyInfoSteps = [
  {
    step: STEP_1,
    title: "Company Details",
    component: CompanyDetails
  },
  {
    step: STEP_2,
    title: "Industry",
    component: Industry
  },
  { step: STEP_3, title: "License Information", component: LicenseInformation }
];

export const companyStatus = {
  dedupe: {
    icon: callbackRegular,
    text:
      "It looks like we already know you and have your details! Let us save you time. We will call you back within X days to meet you in person and help you out."
  },
  virtualCurrencies: {
    icon: declinedRegular,
    text:
      "We apologise that we are unable to offer you a product as the details provided don’t meet out requirements. Thank you for your interest in RAKBANK."
  },
  notEligible: {
    icon: declinedRegular,
    text:
      "Oops, this product is not for you. Our RAKstarter account is for companies operating for less than a year. But don’t worry, we have other products suited for you."
  },
  notRegisteredInUAE: {
    icon: declinedRegular,
    text:
      "It looks like your company is not registered in the UAE. But no worries! Let’s have someone call you back within X days to meet you in person and help you out."
  }
};
