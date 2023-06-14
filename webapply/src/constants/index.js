import routes, { smeBaseName } from "../routes";
import callbackRegular from "./../assets/gif/callback_regular.gif";

export const OtpChannel = {
  Sms: "sms",
  Email: "email"
};

export const authorityType = [
  { value: "AuthorityType1", label: "AuthorityType1" },
  { value: "AuthorityType2", label: "AuthorityType2" }
];

export const formStepper = [
  {
    step: 1,
    title: "Basic Information",
    path: routes.applicantInfo,
    relatedPath: [routes.verifyOtp]
  },
  { step: 2, title: "Company Information", path: routes.companyInfo },
  {
    step: 3,
    title: "Company Stakeholders",
    path: routes.stakeholdersInfo,
    relatedPath: [routes.stakeholdersPreview, routes.StakeholderTermsAndConditions]
  },
  {
    step: 4,
    title: "Additional",
    path: routes.additionalInfoComponent,
    relatedPath: [routes.additionalCompanyInformation]
  },
  { step: 5, title: "Final Questions", path: routes.finalQuestions },
  { step: 6, title: "Upload Documents", path: routes.uploadDocuments },
  {
    step: 7,
    title: "Select Services",
    path: routes.selectServices,
    relatedPath: [routes.SubmitApplication]
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

export const AccountDetails = {
  [accountNames.starter]: {
    subProductCode: {
      [CONVENTIONAL]: "ACNS3",
      [ISLAMIC]: "GCNS4"
    },
    isElite: false
  },
  [accountNames.currentAccount]: {
    subProductCode: {
      [CONVENTIONAL]: "ACNS6",
      [ISLAMIC]: "GCNS2"
    },
    isElite: false
  },
  [accountNames.elite]: {
    subProductCode: {
      [CONVENTIONAL]: "ACNS6",
      [ISLAMIC]: "GCAP1"
    },
    isElite: true
  }
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

const IDNUMBER_UNAVAILABLE = "001";
const INVALID_IDNUMBER = "002";
const EXPIRED_EID = "003";
const EXPIRED_PASSPORT = "004";
const PASSPORT_NUMBER_UNAVAILABLE = "018";
const PASSPORT_ISSUING_COUNTRY_UNAVAILABLE = "019";
const PASSPORT_DOCTYPE_UNAVAILABLE = "020";

const RO_STOP =
  "We noticed that your application is incomplete. Not to worry, our team is already working on it.";
const EXIST = "We already have your application. Not to worry, our team is already working on it.";
const INVALID_ID = "Invalid Prospect ID";
const COMMON_ERROR =
  "We already have your application. Not to worry, our team is already working on it.";
export const INVALID_DOCUMENT = "Invalid Document Error";

export const EID_EXPIRY =
  "Your Emirates ID has expired/ is expiring in next 10 days. Please scan/upload a valid/renewed Emirates ID";
export const PASSPORT_EXPIRY =
  "Your passport has expired/ is expiring in next 10 days. Please scan/upload a valid/renewed passport";
export const DOC_MISMATCH = "Your emirates ID and passport do not match";
export const IDENTITY_VERIFICATION_FAIL = "Verification failed";

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
  [COMMON_SERVER_ERROR]: COMMON_ERROR,
  [IDNUMBER_UNAVAILABLE]: INVALID_DOCUMENT,
  [INVALID_IDNUMBER]: INVALID_DOCUMENT,
  [PASSPORT_NUMBER_UNAVAILABLE]: INVALID_DOCUMENT,
  [PASSPORT_ISSUING_COUNTRY_UNAVAILABLE]: INVALID_DOCUMENT,
  [PASSPORT_DOCTYPE_UNAVAILABLE]: INVALID_DOCUMENT,
  [EXPIRED_EID]: EID_EXPIRY,
  [EXPIRED_PASSPORT]: PASSPORT_EXPIRY
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
  "companyAdditionalInfo",
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
export const BAU_PROSPECT_VERSION = "v1";
export const SIGNING_TRANSACTIONS_TYPE = {
  ALL: "101",
  ANY: "100",
  OTHER: "000",
  SINGLY: "102"
};
//ro-assist-brd1-3
const blank = "_blank";
export const smeSouqLink = "https://rakbank.ae/wps/portal/business-banking/smesouk";
export const EFR_CHECK_ERROR = `Dear Customer, we were unable to complete your facial recognition process successfully. Not to worry! You may still proceed with our alternative application platform by clicking this secure link.<a href="${routes.accountsComparison}" target="${blank}"> https://quickapplyuat.rakbank.ae....</a>`;
export const applicationError = [
  {
    screeningNotes: "DECLINE",
    link: true,
    buttons: [
      {
        external: false,
        link: routes.accountsComparison,
        label: "Back to home"
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
        label: "Back to home"
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
        label: "Yes, check status"
      },
      {
        external: true,
        link: routes.accountsComparison,
        label: "No, thanks"
      }
    ]
  },
  {
    screeningNotes: "WITH_RO",
    link: true,
    buttons: [
      {
        external: false,
        link: routes.comeBackLogin,
        label: "Yes, check status"
      },
      {
        external: true,
        link: routes.accountsComparison,
        label: "No, thanks"
      }
    ]
  },
  {
    screeningNotes: "SUCCESS",
    link: true,
    buttons: [
      {
        external: true,
        link: routes.accountsComparison,
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
    screeningType: "Virtual Currency Check",
    link: true
  },
  {
    error: "iRBL Dedupe",
    screeningType: "iRBL Dedupe Check",
    link: true
  },
  {
    error: "BPM Dedupe",
    screeningType: "BPM Dedupe Check",
    link: true
  },
  {
    error: "Nationality Check",
    screeningType: "Nationality Check Of Sanction Country",
    link: true
  },
  {
    error: "Signatory BL/NL",
    screeningType: "Signatory BL/NL Checks",
    link: true
  },
  {
    error: "not Eligible",
    screeningType: "RAK-Starter Account Validation",
    link: true,
    //ro-assist-brd2-3
    buttons: [
      {
        external: false,
        link: routes.accountsComparison,
        label: "Go to home page"
      }
    ]
  },
  {
    error: "Not Registered In UAE",
    screeningType: "Country Of Incorporation Check",
    link: true
    //link: true
  },
  {
    error: "Sanction Country",
    screeningType: "Sanction Country Of Incorporation Check",
    link: true
  },
  {
    error: "Big Company",
    screeningType: "ShareHolderCount Check",
    link: true
  },
  {
    error: "BlackList",
    screeningType: "Blacklist Check",
    link: true
  },
  {
    error: "Company as stakeholder",
    screeningType: "Company is a Stakeholder Check",
    link: true
  },
  {
    error: "Too many Stakeholders",
    screeningType: "Too many Stakeholders Check",
    link: true
  },
  {
    error: "Total No of Documents",
    screeningType: "Total No of Documents uploaded check",
    link: true
  },
  {
    error: "Company Firco",
    screeningType: "Company Firco Check",
    link: true
  },
  {
    error: 403,
    screeningType: 403,
    link: true
  }
];

export const SCREENING_FAIL_REASONS = ["Decline", "Match"];

export const screeningStatusDefault = {
  icon: callbackRegular,
  link: true,
  error: "Default",
  text:
    "Thank you for your interest in RAKBANK$We apologise that we are unable to offer you a product as the details provided don't meet our requirements."
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

export const AUTO_SAVE_DISABLED_VIEW_IDS = ["/StakeholdersInfo", "/StakeholdersInfoPreview"];

export const ACTION_TYPES = {
  save: "save",
  submit: "submit"
};

export const Personas = {
  SOLE: {
    key: "SOLE",
    title: "I’m a sole proprietor",
    subTitle: "I own this business",
    url: routes.applicantInfo,
    urlType: "2.0",
    companyCategoryCode: "1_SP",
    order: 1
  },
  SLLC: {
    key: "SLLC",
    title: "I'm sole proprietor with an LLC",
    subTitle: "I do business as a limited liability company (LLC)",
    url: routes.applicantInfo,
    urlType: "2.0",
    companyCategoryCode: "2_SPLL",
    order: 2
  },
  NOTA: {
    key: "NOTA",
    title: "None of the above",
    subTitle:
      "I'm a partner in the business, have Power of Attorney, or am applying on behalf of someone else.",
    url: process.env.REACT_APP_BAU_URL || "/",
    urlType: "bau",
    companyCategoryCode: "3_OTHER",
    order: 3
  }
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
  COMPANY_FIRCO_CHECK
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

export const personaSelectionRoutesMap = {
  [accountNames.starter]: {
    [CONVENTIONAL]: `${smeBaseName}/accounts/${RAKSTARTER_ROUTE_PARAM}/persona-selection`,
    [ISLAMIC]: `${smeBaseName}/accounts/${RAKSTARTER_ISLAMIC_ROUTE_PARAM}/persona-selection`
  },
  [accountNames.currentAccount]: {
    [CONVENTIONAL]: `${smeBaseName}/accounts/${CURRENT_ACCOUNT_ROUTE_PARAM}/persona-selection`,
    [ISLAMIC]: `${smeBaseName}/accounts/${CURRENT_ACCOUNT_ISLAMIC_ROUTE_PARAM}/persona-selection`
  },
  [accountNames.elite]: {
    [CONVENTIONAL]: `${smeBaseName}/accounts/${ELITE_ROUTE_PARAM}/persona-selection`,
    [ISLAMIC]: `${smeBaseName}/accounts/${ELITE_ISLAMIC_ROUTE_PARAM}/persona-selection`
  }
};

export const personaSelectionRoutes = [
  `${smeBaseName}/accounts/${RAKSTARTER_ROUTE_PARAM}/persona-selection`,
  `${smeBaseName}/accounts/${RAKSTARTER_ISLAMIC_ROUTE_PARAM}/persona-selection`,
  `${smeBaseName}/accounts/${CURRENT_ACCOUNT_ROUTE_PARAM}/persona-selection`,
  `${smeBaseName}/accounts/${CURRENT_ACCOUNT_ISLAMIC_ROUTE_PARAM}/persona-selection`,
  `${smeBaseName}/accounts/${ELITE_ROUTE_PARAM}/persona-selection`,
  `${smeBaseName}/accounts/${ELITE_ISLAMIC_ROUTE_PARAM}/persona-selection`
];

export const DEFAULT_REFERRAL_NAME = "Direct";
export const USER_IDLE_TIMEOUT = (process.env.REACT_APP_SESSION_TIMEOUT - 1) * 60 * 1000;
export const EXPIRY_INTERVAL = 60;
export const UPLOAD = "Upload ";

export const MOA_ACCEPTED_FILE_TYPES = {
  "image/png": [".png"],
  "image/jpeg": [".jpeg"],
  "application/pdf": ["application/pdf"]
};

export const TL_ACCEPTED_FILE_TYPES = {
  "image/png": [".png"],
  "image/jpeg": [".jpeg"],
  "application/pdf": ["application/pdf"]
};

export const DOC_TYPE_EID = "id";
export const DOC_TYPE_PASSPORT = "passport";
export const MOA_FILE_SIZE = { minSize: "9500", maxSize: "5242880" };
export const TL_COI_FILE_SIZE = { minSize: "9500", maxSize: "5242880" };

export const BBG_COMPANY_INFO_MODULEID = "SMA";

export const EID_PASSPORT_ACCEPTED_FILE_TYPES = {
  "image/png": [".png"],
  "image/jpeg": [".jpeg"],
  "application/pdf": [".pdf"]
};
export const EID_PASSPORT_FILE_SIZE = { minSize: "9500", maxSize: "5242880" };

export const SESSION_TYPE = "STAKEHOLDER_KYC";

export const QR_CODE_REFRESH_BEFORE_SECONDS = 10000;

export const QR_CODE_SIZE = 200;

export const WTM_STATUS = {
  IN_PROGRESS: "IN PROGRESS",
  FINISHED: "COMPLETED"
};

export const BUSINESS_RELATIONSHIPS = {
  CUSTOMER_LIMIT: 3,
  SUPPLIER_LIMIT: 3
};
