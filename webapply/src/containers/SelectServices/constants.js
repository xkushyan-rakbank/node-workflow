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
export const INPUT_ID_INDEX = [0];
export const INPUT_ID_INDEXES = [0, 0];
export const GO_TO_SUBMIT_STEP = 5;
export const SUBMIT_APPLICATION_STEP = 6;
export const ACCOUNTS_SIGNING_NAME_OTHER = "Others";
export const ACCOUNTS_SIGNING_NAME_ALL = "ALL";

export const servicesSteps = [
  {
    step: 1,
    title: "Account details",
    component: AccountDetails,
    icon: accountDetails
  },
  {
    step: 2,
    title: "Signing preferences",
    component: SigningPreferences,
    icon: signingPreferences
  },
  { step: 3, title: "Channels", component: Channels, icon: channels, titleInfo: "" },
  {
    step: 4,
    title: "Value added services",
    component: ValueAddedServices,
    icon: valueAddedServices
  }
];
