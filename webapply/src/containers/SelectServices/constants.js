import { ICONS } from "../../components/Icons";
import { AccountDetails } from "./AccountDetails";
import { SigningPreferences } from "./SigningPreferences";
import { Channels } from "./Channels";
import { ValueAddedServices } from "./ValueAddedServices";
import { GA_EVENTS } from "../../utils/ga";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;
export const STEP_4 = 4;
export const GO_TO_SUBMIT_STEP = 5;

// TODO get this data from datalist
export const signingInfo = {
  "100": "Any of us can sign",
  "101": "All of us must sign"
};

export const servicesSteps = [
  {
    step: STEP_1,
    title: "Account details",
    component: AccountDetails,
    icon: ICONS.accountDetails,
    event_name: GA_EVENTS.SELECT_SERVICE_ACCOUNT_DETAILS_CONTINUE
  },
  {
    step: STEP_2,
    title: "Signing preferences",
    component: SigningPreferences,
    icon: ICONS.signingPreferences,
    event_name: GA_EVENTS.SELECT_SERVICE_SIGNING_PREFERENCE_CONTINUE
  },
  {
    step: STEP_3,
    title: "Channels",
    component: Channels,
    icon: ICONS.channels,
    titleInfo: "",
    event_name: GA_EVENTS.SELECT_SERVICE_CHANNELS_CONTINUE
  },
  {
    step: STEP_4,
    title: "Value added services",
    component: ValueAddedServices,
    icon: ICONS.valueAddedServices,
    event_name: GA_EVENTS.SELECT_SERVICE_KEEP_PLUS_UPGRADE_CONTINUE
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
