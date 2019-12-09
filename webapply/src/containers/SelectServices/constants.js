import { AccountDetails } from "./AccountDetails";
import { SigningPreferences } from "./SigningPreferences";
import { Channels } from "./Channels";
import { ValueAddedServices } from "./ValueAddedServices";

import accountDetails from "../../assets/icons/account_details.png";
import signingPreferences from "../../assets/icons/signing_preferences.png";
import channels from "../../assets/icons/channels.png";
import valueAddedServices from "../../assets/icons/value_added_services.png";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;
export const STEP_4 = 4;
export const GO_TO_SUBMIT_STEP = 5;
export const SUBMIT_APPLICATION_STEP = 6;
export const ACCOUNTS_SIGNING_NAME_OTHER = "Others";
export const ACCOUNTS_SIGNING_NAME_ALL = "ALL";

export const servicesSteps = [
  {
    step: STEP_1,
    title: "Account details",
    component: AccountDetails,
    icon: accountDetails
  },
  {
    step: STEP_2,
    title: "Signing preferences",
    component: SigningPreferences,
    icon: signingPreferences
  },
  { step: STEP_3, title: "Channels", component: Channels, icon: channels, titleInfo: "" },
  {
    step: STEP_4,
    title: "Value added services",
    component: ValueAddedServices,
    icon: valueAddedServices
  }
];
