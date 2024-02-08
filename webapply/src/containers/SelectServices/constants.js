import { SIGNING_TRANSACTIONS_TYPE } from "../../constants";

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

export const initialsignatoryDetails = [
  {
    signatoryName: "",
    education: "",
    backgroundInfo: ""
  }
];
