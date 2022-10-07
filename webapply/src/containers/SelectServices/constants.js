import { ICONS } from "../../components/Icons";
import { AccountDetails } from "./components/AccountDetails";
import { SigningPreferences } from "./components/SigningPreferences";
import { Channels } from "./components/Channels";
import { ValueAddedServices } from "./components/ValueAddedServices";
import { GA_EVENTS } from "../../utils/ga";
import { SIGNING_TRANSACTIONS_TYPE } from "../../constants";
import { ExpressServices } from "./components/Express";
import { KycAnnexure } from "./components/KycAnnexure";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;
export const STEP_4 = 4;
export const STEP_5 = 5;
export const STEP_6 = 6;

export const INITIAL_INDEX = 0;

export const signingInfo = {
  [SIGNING_TRANSACTIONS_TYPE.ANY]: "Any of us can sign",
  [SIGNING_TRANSACTIONS_TYPE.ALL]: "All of us must sign",
  [SIGNING_TRANSACTIONS_TYPE.OTHER]: "Other"
};

//ro-assist-brd3-17
export const servicesSteps = {
  true: [
    {
      step: STEP_1,
      title: "Express Service (for AED Accounts only*)",
      component: ExpressServices,
      icon: ICONS.bolt,
      eventName: GA_EVENTS.SELECT_SERVICE_ACCOUNT_DETAILS_CONTINUE
    },
    {
      step: STEP_2,
      title: "Account details",
      component: AccountDetails,
      icon: ICONS.accountDetails,
      eventName: GA_EVENTS.SELECT_SERVICE_ACCOUNT_DETAILS_CONTINUE
    },
    {
      step: STEP_3,
      title: "Signing preferences",
      component: SigningPreferences,
      icon: ICONS.signingPreferences,
      eventName: GA_EVENTS.SELECT_SERVICE_SIGNING_PREFERENCE_CONTINUE
    },
    {
      step: STEP_4,
      title: "Channels",
      component: Channels,
      icon: ICONS.channels,
      titleInfo: "",
      eventName: GA_EVENTS.SELECT_SERVICE_CHANNELS_CONTINUE
    },
    {
      step: STEP_5,
      title: "KYC Annexure",
      component: KycAnnexure,
      icon: ICONS.kycAnnexure,
      eventName: GA_EVENTS.SELECT_SERVICE_KYC_ANNEXURE_CONTINUE
    },
    {
      step: STEP_6,
      title: "Value added services",
      component: ValueAddedServices,
      icon: ICONS.valueAddedServices,
      eventName: GA_EVENTS.SELECT_SERVICE_KEEP_PLUS_UPGRADE_CONTINUE
    }
  ],
  false: [
    {
      step: STEP_1,
      title: "Express Service (for AED Accounts only*)",
      component: ExpressServices,
      icon: ICONS.bolt,
      eventName: GA_EVENTS.SELECT_SERVICE_ACCOUNT_DETAILS_CONTINUE
    },
    {
      step: STEP_2,
      title: "Account details",
      component: AccountDetails,
      icon: ICONS.accountDetails,
      eventName: GA_EVENTS.SELECT_SERVICE_ACCOUNT_DETAILS_CONTINUE
    },
    {
      step: STEP_3,
      title: "Signing preferences",
      component: SigningPreferences,
      icon: ICONS.signingPreferences,
      eventName: GA_EVENTS.SELECT_SERVICE_SIGNING_PREFERENCE_CONTINUE
    },
    {
      step: STEP_4,
      title: "Channels",
      component: Channels,
      icon: ICONS.channels,
      titleInfo: "",
      eventName: GA_EVENTS.SELECT_SERVICE_CHANNELS_CONTINUE
    },
    {
      step: STEP_5,
      title: "Value added services",
      component: ValueAddedServices,
      icon: ICONS.valueAddedServices,
      eventName: GA_EVENTS.SELECT_SERVICE_KEEP_PLUS_UPGRADE_CONTINUE
    }
  ]
};
// export const servicesSteps = [
//   {
//     step: STEP_1,
//     title: "Express Service (for AED Accounts only*)",
//     component: ExpressServices,
//     icon: ICONS.bolt,
//     eventName: GA_EVENTS.SELECT_SERVICE_ACCOUNT_DETAILS_CONTINUE
//   },
//   {
//     step: STEP_2,
//     title: "Account details",
//     component: AccountDetails,
//     icon: ICONS.accountDetails,
//     eventName: GA_EVENTS.SELECT_SERVICE_ACCOUNT_DETAILS_CONTINUE
//   },
//   {
//     step: STEP_3,
//     title: "Signing preferences",
//     component: SigningPreferences,
//     icon: ICONS.signingPreferences,
//     eventName: GA_EVENTS.SELECT_SERVICE_SIGNING_PREFERENCE_CONTINUE
//   },
//   {
//     step: STEP_4,
//     title: "Channels",
//     component: Channels,
//     icon: ICONS.channels,
//     titleInfo: "",
//     eventName: GA_EVENTS.SELECT_SERVICE_CHANNELS_CONTINUE
//   },
//   {
//     step: STEP_5,
//     title: "KYC Annexure",
//     component: KycAnnexure,
//     icon: ICONS.signingPreferences,
//     eventName: GA_EVENTS.SELECT_SERVICE_KYC_ANNEXURE_CONTINUE
//   },
//   {
//     step: STEP_6,
//     title: "Value added services",
//     component: ValueAddedServices,
//     icon: ICONS.valueAddedServices,
//     eventName: GA_EVENTS.SELECT_SERVICE_KEEP_PLUS_UPGRADE_CONTINUE
//   }
// ];

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

export const SELECT_SERVICES_PAGE_ID = "selectServices";

export const ACCOUNTSIGNTYPE = "102";

export const MAX_COMPANY_NAME_LENGTH = 50;
export const MAX_BANK_NAME_LENGTH = 50;
export const RO_DATA_LENGTH = 80;
export const GOAMLREGISTRATION_REMARK_LENGTH = 20;
export const BANKSTATEMENT_REMARK_LENGTH = 250;
export const EXPERIENCE_BUSINESS_MODAL_LENGTH = 5000;
export const KYCVERIFICATION_LENGTH = 50;
export const SIGNATORY_EID_INFO_LENGTH = 250;
export const RO_NAME_LENGTH = 50;

export const initialOtherBankDetails = [{ bankName: "" }];
export const initialTopCustomers = [{ name: "", country: "" }];
export const initialBankDetails = [
  {
    bankName: "",
    isStatementAvailable: "yes",
    bankStatementRemark: "",
    bankStatementFrom: "",
    bankStatementTo: ""
  }
];
