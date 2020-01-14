import { ICONS } from "../../components/Icons";
import { AccountDetails } from "./AccountDetails";
import { SigningPreferences } from "./SigningPreferences";
import { Channels } from "./Channels";
import { ValueAddedServices } from "./ValueAddedServices";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;
export const STEP_4 = 4;
export const GO_TO_SUBMIT_STEP = 5;
export const SUBMIT_APPLICATION_STEP = 6;
export const ACCOUNTS_SIGNING_NAME_OTHER = "A3";
export const signingInfo = {
  A1: "All of you can sign",
  A2: "Any of you can sign"
};

export const servicesSteps = [
  {
    step: STEP_1,
    title: "Account details",
    component: AccountDetails,
    icon: ICONS.accountDetails
  },
  {
    step: STEP_2,
    title: "Signing preferences",
    component: SigningPreferences,
    icon: ICONS.signingPreferences
  },
  { step: STEP_3, title: "Channels", component: Channels, icon: ICONS.channels, titleInfo: "" },
  {
    step: STEP_4,
    title: "Value added services",
    component: ValueAddedServices,
    icon: ICONS.valueAddedServices
  }
];

export const ALLOWED_CURRENCY = ["AED", "USD", "GBP", "EUR"];
