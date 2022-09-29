import routes, { smeBaseName } from "../routes";
import callbackRegular from "./../assets/gif/callback_regular.gif";

export const authorityType = [
  { value: "AuthorityType1", label: "AuthorityType1" },
  { value: "AuthorityType2", label: "AuthorityType2" }
];

export const formStepper = [
  {
    step: 1,
    title: "Basic Information",
    path: routes.applicantInfo,
    relatedPath: routes.verifyOtp
  },
  { step: 2, title: "Company Information", path: routes.companyInfo },
  { step: 3, title: "Company Stakeholders", path: routes.stakeholdersInfo },
  { step: 4, title: "Final Questions", path: routes.finalQuestions },
  { step: 5, title: "Upload Documents", path: routes.uploadDocuments },
  {
    step: 6,
    title: "Select Services",
    path: routes.selectServices,
    relatedPath: routes.SubmitApplication
  }
];

export const agentFormStepper = [
  { step: 1, title: "Search Applications", path: routes.searchProspect },
  { step: 2, title: "Send Invite", path: routes.inviteCustomer }
];

export const searchProspectStepper = [
  {
    step: 1,
    title: "Search Applications",
    path: routes.searchProspect,
    titleInfo: ""
  }
];

export const digitRegExp = new RegExp("^[0-9]$");

export const CONVENTIONAL = "conventional";
export const ISLAMIC = "islamic";

export const accountNames = {
  starter: "RAKStarter",
  currentAccount: "Current Account",
  elite: "RAKelite"
};

export const accountTitles = {
  starter: "RAKstarter",
  currentAccount: "Current Account",
  elite: "Business Elite"
};

export const UAE_CODE = "971";
export const UAE = "AE";
export const UAE_CURRENCY = "AED";
export const MAX_EMAIL_LENGTH = 50;

export const REQUEST_LOADING = "loading";
export const REQUEST_SUCCESS = "success";

export const normalScrollHeight = 740;

const RO_EDITING = "12013";
const CIF_EXIST = "12012";
const INVALID_PROSPECT_ID = "12002";
const OCCURRED_WHILE_CREATING_CIF = "EXP101";
const NO_RESULT_FOUND = "12009";
const CLIENT_SIDE_VALIDATION_ERROR = "FATAL0001";
const HAPPENED_WHILE_PERFORMING_AUDIT_WHILE_UPDATE_PROSPECT = "10004";
const NO_RECORDS_FETCHED_WHILE_RETRIEVING_CORD = "I001F/12000";
const ERROR_OCCURRED_WHILE_PERFORMING_VALIDATION_CHECKS = "EXP101";
const COMMON_SERVER_ERROR = "INV0001";

const RO_STOP =
  "We noticed that your application is incomplete. Not to worry, our team is already working on it.";
const EXIST = "We already have your application. Not to worry, our team is already working on it.";
const INVALID_ID = "Invalid Prospect ID";
const COMMON_ERROR =
  "We already have your application. Not to worry, our team is already working on it.";

export const PROSPECT_STATUSES = {
  ASSESSING: "Assessing",
  DOCUMENTS_NEEDED: "Documents needed",
  NEED_ADDITIONAL_DOCUMENTS: "Need Additional Information/Documents"
};

export const ERROR_MESSAGES = {
  [RO_EDITING]: RO_STOP,
  [CIF_EXIST]: EXIST,
  [INVALID_PROSPECT_ID]: INVALID_ID,
  [OCCURRED_WHILE_CREATING_CIF]: COMMON_ERROR,
  [CLIENT_SIDE_VALIDATION_ERROR]: COMMON_ERROR,
  [HAPPENED_WHILE_PERFORMING_AUDIT_WHILE_UPDATE_PROSPECT]: COMMON_ERROR,
  [NO_RECORDS_FETCHED_WHILE_RETRIEVING_CORD]: COMMON_ERROR,
  [ERROR_OCCURRED_WHILE_PERFORMING_VALIDATION_CHECKS]: COMMON_ERROR,
  [COMMON_SERVER_ERROR]: COMMON_ERROR
};

export const APP_STOP_SCREEN_RESULT = "stop";
export const HANDLED_ERROR_CODES = [
  RO_EDITING,
  CIF_EXIST,
  INVALID_PROSPECT_ID,
  OCCURRED_WHILE_CREATING_CIF,
  CLIENT_SIDE_VALIDATION_ERROR,
  HAPPENED_WHILE_PERFORMING_AUDIT_WHILE_UPDATE_PROSPECT,
  NO_RECORDS_FETCHED_WHILE_RETRIEVING_CORD,
  ERROR_OCCURRED_WHILE_PERFORMING_VALIDATION_CHECKS,
  COMMON_SERVER_ERROR
];

export const IGNORE_ERROR_CODES = [NO_RESULT_FOUND, RO_EDITING];

export const COMPANY_DOCUMENTS = "companyDocuments";
export const STAKEHOLDER_DOCUMENTS = "stakeholdersDocuments";
export const OTHER_DOCUMENTS = "otherDocuments";

// ro-assist-brd2-1
export const COMPANY_BANK_STATEMENTS = "companyBankStatements";
export const COMPANY_ADDRESS_PROOF = "companyAddressProof";
export const COMPANY_INVOICES = "companyInvoices";
export const PERSONAL_BANK_STATEMENTS = "personalBankStatements";
export const PERSONAL_BACKGROUND = "personalBackground";

export const COMPANY_BANK_STATEMENTS_DOCTYPE = "Bank_Statements";
export const COMPANY_ADDRESS_PROOF_DOCTYPE = "Company_Address_Proof";
export const COMPANY_INVOICES_DOCTYPE = "Invoices_Contracts_Shipment_MOU_Custom";
export const PERSONAL_BANK_STATEMENTS_DOCTYPE = "Personal_Bank_Statements";
export const PERSONAL_BACKGROUND_DOCTYPE = "CV_Personal_Background";

export const companyMultiDocs = [COMPANY_BANK_STATEMENTS, COMPANY_ADDRESS_PROOF, COMPANY_INVOICES];
export const stakeholderMultiDocs = [PERSONAL_BANK_STATEMENTS, PERSONAL_BACKGROUND];
export const CREAT_PROSPECT_KEYS = [
  "applicantInfo",
  "generalInfo",
  "applicationInfo",
  "accountInfo",
  "organizationInfo",
  "orgKYCDetails",
  "signatoryInfo",
  "channelServicesInfo",
  "documents",
  "prospectStatusInfo",
  "kycAnnexure",
  "freeFieldsInfo"
];

/* Action Types */
export const SAVE = "save";
export const SUBMIT = "submit";

/* Save Types */
export const AUTO = "auto";
export const CONTINUE = "continue";
export const NEXT = "next";

export const SIGNING_TRANSACTIONS_TYPE = {
  ALL: "101",
  ANY: "100",
  OTHER: "000"
};
//ro-assist-brd1-3
export const smeSouqLink = "https://rakbank.ae/wps/portal/business-banking/smesouk";

export const applicationdedupe = [
  {
    screeningNotes: "DECLINE",
    link: true,
    buttons: [
      {
        external: false,
        link: routes.accountsComparison,
        label: "Go to home page"
      }
    ]
  },
  {
    screeningNotes: "INELIGIBLE",
    link: true,
    buttons: [
      {
        external: false,
        link: routes.accountsComparison,
        label: "Go to home page"
      }
    ]
  },
  {
    screeningNotes: "PENDING",
    link: true,
    buttons: [
      {
        external: false,
        link: routes.comeBackLogin,
        label: "Continue"
      }
    ]
  },
  {
    screeningNotes: "SUCCESS",
    link: true,
    buttons: [
      {
        external: true,
        link: smeSouqLink,
        label: "No, thanks"
      },
      {
        external: false,
        link: routes.comeBackLogin,
        label: "Yes"
      }
    ]
  },
  {
    screeningNotes: "WITH_RO",
    link: true,
    buttons: [
      {
        external: true,
        link: smeSouqLink,
        label: "No, thanks"
      },
      {
        external: false,
        link: routes.comeBackLogin,
        label: "Yes"
      }
    ]
  }
];
export const screeningStatus = [
  {
    error: "Dedupe",
    screeningType: "Dedupe Check",
    //ro-assist-brd2-3
    link: true,
    buttons: [
      {
        external: false,
        link: routes.accountsComparison,
        label: "Go to home page"
      }
    ]
  },
  {
    //ro-assist-brd1-3
    error: "Application Dedupe",
    screeningType: "Application Dedupe Check"
  },
  {
    error: "Virtual Currencies",
    screeningType: "Virtual Currency Check"
  },
  {
    error: "not Eligible",
    screeningType: "RAK-Starter Account Validation",
    link: true,
    //ro-assist-brd2-3
    buttons: [
      {
        external: false,
        link: routes.currentAccount,
        label: "Open Current Account"
      }
    ]
  },
  {
    error: "Not Registered In UAE",
    screeningType: "Country Of Incorporation Check"
  },
  {
    error: "Big Company",
    screeningType: "ShareHolderCount Check"
  },
  {
    error: "BlackList",
    screeningType: "Blacklist Check"
  },
  {
    error: "Company as stakeholder",
    screeningType: "Company is a Stakeholder Check"
  },
  {
    error: "Too many Stakeholders",
    screeningType: "Too many Stakeholders Check"
  },
  {
    error: "Total No of Documents",
    screeningType: "Total No of Documents uploaded check"
  }
];

export const SCREENING_FAIL_REASONS = ["Decline", "Match"];

export const screeningStatusDefault = {
  icon: callbackRegular,
  error: "Default",
  text:
    "We apologise that we are unable to offer you a product. Thank you for your interest in RAKBANK"
};

export const DATE_FORMAT = "yyyy-MM-dd";
export const DATE_TIME_FORMAT = "yyyy-MM-dd hh:mm a";
export const BYTES_IN_MEGABYTE = 1048576;

export const VIEW_IDS = {
  CompanyInfo: "/CompanyInfo",
  StakeholdersInfo: "/StakeholdersInfo",
  FinalQuestions: "/FinalQuestions",
  UploadDocuments: "/UploadDocuments",
  SelectServices: "/SelectServices",
  SubmitApplication: "/SubmitApplication",
  SearchProspect: "/SearchProspect",
  SearchedAppInfo: "/SearchedAppInfo",
  ApplicationSubmitted: "/ApplicationSubmitted",
  ReUploadDocuments: "/ReUploadDocuments"
};

export const ACTION_TYPES = {
  save: "save",
  submit: "submit"
};

export const SOLE_PROPRIETOR = "1";

export const FINAL_QUESTIONS_COMPANY_ID = "finalQuestionsCompany";
export const COMPANY_SIGNATORY_ID = "companySignatory_";

export const STEP_STATUS = {
  AVAILABLE: "AVAILABLE",
  NOT_AVAILABLE: "NOT_AVAILABLE",
  COMPLETED: "COMPLETED"
};

// Company Check list
export const NEGATIVE_LIST_CHECK = {
  screeningType: "Negative List Check",
  screeningStatus: "Not completed",
  screeningLabel: "Negative List Check"
};
export const VIRTUAL_CURRENCY_CHECK = {
  screeningType: "Virtual Currency Check",
  screeningStatus: "Not completed",
  screeningLabel: "Virtual Currency Check"
};
export const COUNTRYOFINCORPORATION_CHECK = {
  screeningType: "Country Of Incorporation Check",
  screeningStatus: "Not completed",
  screeningLabel: "Offshore Company Check"
};
export const RAKSTARTER_ACCOUNT_CHECK = {
  screeningType: "RAK-Starter Account Validation",
  screeningStatus: "Not completed",
  screeningLabel: "RAK-Starter Account Validation"
};
export const DEDUPE_CHECK = {
  screeningType: "Dedupe Check",
  screeningStatus: "Not completed",
  screeningLabel: "Dedupe Check"
};
export const APPLICATION_DEDUPE_CHECK = {
  screeningType: "Application Dedupe Check",
  screeningStatus: "Not completed",
  screeningLabel: "Application Dedupe Check"
};
export const ISSHAREHOLDERACOMPANY_CHECK = {
  screeningType: "Company is a Stakeholder Check",
  screeningStatus: "Not completed",
  screeningLabel: "Company is a Stakeholder Check"
};
export const BLACKLIST_CHECK = {
  screeningType: "Blacklist Check",
  screeningStatus: "Not completed",
  screeningLabel: "Blacklist Check"
};
export const TOO_MANY_STAKEHOLDERS = {
  screeningType: "Too many Stakeholders Check",
  screeningStatus: "Not completed",
  screeningLabel: "Too many Stakeholders Check"
};
export const COMPANY_FIRCO_CHECK = {
  screeningType: "Company Firco Check",
  screeningStatus: "Not completed",
  screeningLabel: "Company Firco Check"
};
export const SIGNATORY_FIRCO_CHECK = {
  screeningType: "Signatory Firco Check",
  screeningStatus: "Not completed",
  screeningLabel: "Signatory Firco Check"
};

export const COMPANY_CHECK_NAMES = [
  DEDUPE_CHECK,
  APPLICATION_DEDUPE_CHECK,
  BLACKLIST_CHECK,
  NEGATIVE_LIST_CHECK,
  COUNTRYOFINCORPORATION_CHECK,
  VIRTUAL_CURRENCY_CHECK,
  RAKSTARTER_ACCOUNT_CHECK,
  ISSHAREHOLDERACOMPANY_CHECK,
  TOO_MANY_STAKEHOLDERS,
  COMPANY_FIRCO_CHECK,
  SIGNATORY_FIRCO_CHECK
];

export const RAKSTARTER_ROUTE_PARAM = "rakstarter";
export const CURRENT_ACCOUNT_ROUTE_PARAM = "current-account";
export const ELITE_ROUTE_PARAM = "business-elite";
export const RAKSTARTER_ISLAMIC_ROUTE_PARAM = "rakstarter-islamic";
export const CURRENT_ACCOUNT_ISLAMIC_ROUTE_PARAM = "current-account-islamic";
export const ELITE_ISLAMIC_ROUTE_PARAM = "business-elite-islamic";

export const AUTO_SAVE_INTERVAL = 40000;

export const UPLOADED = "Uploaded";

export const accountTypeURIs = {
  [RAKSTARTER_ROUTE_PARAM]: {
    accountType: accountNames.starter,
    isIslamicBanking: false
  },
  [CURRENT_ACCOUNT_ROUTE_PARAM]: {
    accountType: accountNames.currentAccount,
    isIslamicBanking: false
  },
  [ELITE_ROUTE_PARAM]: {
    accountType: accountNames.elite,
    isIslamicBanking: false
  },
  [RAKSTARTER_ISLAMIC_ROUTE_PARAM]: {
    accountType: accountNames.starter,
    isIslamicBanking: true
  },
  [CURRENT_ACCOUNT_ISLAMIC_ROUTE_PARAM]: {
    accountType: accountNames.currentAccount,
    isIslamicBanking: true
  },
  [ELITE_ISLAMIC_ROUTE_PARAM]: {
    accountType: accountNames.elite,
    isIslamicBanking: true
  }
};

export const detailedAccountRoutesMap = {
  [accountNames.starter]: {
    [CONVENTIONAL]: `${smeBaseName}/accounts/${RAKSTARTER_ROUTE_PARAM}`,
    [ISLAMIC]: `${smeBaseName}/accounts/${RAKSTARTER_ISLAMIC_ROUTE_PARAM}`
  },
  [accountNames.currentAccount]: {
    [CONVENTIONAL]: `${smeBaseName}/accounts/${CURRENT_ACCOUNT_ROUTE_PARAM}`,
    [ISLAMIC]: `${smeBaseName}/accounts/${CURRENT_ACCOUNT_ISLAMIC_ROUTE_PARAM}`
  },
  [accountNames.elite]: {
    [CONVENTIONAL]: `${smeBaseName}/accounts/${ELITE_ROUTE_PARAM}`,
    [ISLAMIC]: `${smeBaseName}/accounts/${ELITE_ISLAMIC_ROUTE_PARAM}`
  }
};

export const detailedAccountRoutes = [
  `${smeBaseName}/accounts/${RAKSTARTER_ROUTE_PARAM}`,
  `${smeBaseName}/accounts/${RAKSTARTER_ISLAMIC_ROUTE_PARAM}`,
  `${smeBaseName}/accounts/${CURRENT_ACCOUNT_ROUTE_PARAM}`,
  `${smeBaseName}/accounts/${CURRENT_ACCOUNT_ISLAMIC_ROUTE_PARAM}`,
  `${smeBaseName}/accounts/${ELITE_ISLAMIC_ROUTE_PARAM}`,
  `${smeBaseName}/accounts/${ELITE_ROUTE_PARAM}`
];

export const applicationOverviewRoutesMap = {
  [accountNames.starter]: {
    [CONVENTIONAL]: `${smeBaseName}/accounts/${RAKSTARTER_ROUTE_PARAM}/application-overview`,
    [ISLAMIC]: `${smeBaseName}/accounts/${RAKSTARTER_ISLAMIC_ROUTE_PARAM}/application-overview`
  },
  [accountNames.currentAccount]: {
    [CONVENTIONAL]: `${smeBaseName}/accounts/${CURRENT_ACCOUNT_ROUTE_PARAM}/application-overview`,
    [ISLAMIC]: `${smeBaseName}/accounts/${CURRENT_ACCOUNT_ISLAMIC_ROUTE_PARAM}/application-overview`
  },
  [accountNames.elite]: {
    [CONVENTIONAL]: `${smeBaseName}/accounts/${ELITE_ROUTE_PARAM}/application-overview`,
    [ISLAMIC]: `${smeBaseName}/accounts/${ELITE_ISLAMIC_ROUTE_PARAM}/application-overview`
  }
};

export const applicationOverviewRoutes = [
  `${smeBaseName}/accounts/${RAKSTARTER_ROUTE_PARAM}/application-overview`,
  `${smeBaseName}/accounts/${RAKSTARTER_ISLAMIC_ROUTE_PARAM}/application-overview`,
  `${smeBaseName}/accounts/${CURRENT_ACCOUNT_ROUTE_PARAM}/application-overview`,
  `${smeBaseName}/accounts/${CURRENT_ACCOUNT_ISLAMIC_ROUTE_PARAM}/application-overview`,
  `${smeBaseName}/accounts/${ELITE_ISLAMIC_ROUTE_PARAM}/application-overview`,
  `${smeBaseName}/accounts/${ELITE_ROUTE_PARAM}/application-overview`
];

export const DEFAULT_REFERRAL_NAME = "Direct";
export const USER_IDLE_TIMEOUT = (process.env.REACT_APP_SESSION_TIMEOUT - 1) * 60 * 1000;
export const EXPIRY_INTERVAL = 60;
