import { ICONS } from "../../components/Icons";
import { AccountDetails } from "./AccountDetails";
import { SigningPreferences } from "./SigningPreferences";
import { Channels } from "./Channels";
import { ValueAddedServices } from "./ValueAddedServices";
import { SIGNING_TRANSACTIONS_TYPE } from "../../constants";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;
export const STEP_4 = 4;
export const GO_TO_SUBMIT_STEP = 5;

export const INITIAL_INDEX = 0;

export const signingInfo = {
  [SIGNING_TRANSACTIONS_TYPE.ANY]: "Any of us can sign",
  [SIGNING_TRANSACTIONS_TYPE.ALL]: "All of us must sign",
  [SIGNING_TRANSACTIONS_TYPE.OTHER]: "Other"
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

export const DATA_CURRENCIES = [
  {
    code: "AED",
    key: "AED",
    value: "AED",
    displayText: "AED",
    subGroup: null
  },
  {
    code: "EUR",
    key: "EUR",
    value: "EUR",
    displayText: "EUR",
    subGroup: null
  },
  {
    code: "USD",
    key: "USD",
    value: "USD",
    displayText: "USD",
    subGroup: null
  },
  {
    code: "GBP",
    key: "GBP",
    value: "GBP",
    displayText: "GBP",
    subGroup: null
  }
];
