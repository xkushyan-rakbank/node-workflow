import React from "react";
import routes from "../routes";
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
    relatedPath: routes.verifyOtp //clarify in Dhanya about additional item on right steps
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

export const searchProspectStepper = [
  {
    step: 1,
    title: "Search Applications",
    path: routes.searchProspect,
    titleInfo: ""
  }
];

export const digitRegExp = new RegExp("^[0-9]$");

export const submitApplication = {
  termCondition: "terms & conditions",
  termsOfEnrolment: "terms of enrolment",
  termConditionUrl:
    "https://rakbank.ae/wps/wcm/connect/3f9d99b1-d7a2-4634-82b5-08f03e734295/%28A%29%2BJ00781%2BRAK%2B%2BDebit%2BCard%2B-%2BBusiness%2BA4-T%26C-New%2BGuide-EN%26AR%28withe%2Bout%2Bc....pdf?MOD=AJPERES&CVID=lTLVCHV",
  //TODO: need to update the URL
  termOfEnrolmentUrl:
    "https://rakbank.ae/wps/wcm/connect/3f9d99b1-d7a2-4634-82b5-08f03e734295/%28A%29%2BJ00781%2BRAK%2B%2BDebit%2BCard%2B-%2BBusiness%2BA4-T%26C-New%2BGuide-EN%26AR%28withe%2Bout%2Bc....pdf?MOD=AJPERES&CVID=lTLVCHV",
  formTitle: "Submit application",
  formInfo:
    "And just like that, we have reached the end! Here’s the overview of what you’re applying for.",
  trueNdCompleteAcknldgelabel: "I confirm that the information provided is true and complete",
  needCommunicationLabel: "I want to receive marketing and promotional communication from RAKBANK"
};

export const accountNames = {
  starter: "RAKStarter",
  currentAccount: "Current Account",
  elite: "RAKelite"
};

export const UAE_CODE = "971";
export const UAE = "AE";
export const UAE_CURRENCY = "AED";
export const MAX_EMAIL_LENGTH = 50;
export const MAX_STAKEHOLDERS_LENGTH = 12;
export const MAX_SHAREHOLDERS_LENGTH = 4;
export const MAX_SIGNATORIES_LENGTH = 8;

export const REQUEST_LOADING = "loading";
export const REQUEST_SUCCESS = "success";
export const REQUEST_FAILED = "error";

export const normalScrollHeight = 740;

export const APP_STOP_SCREEN_RESULT = "stop";
export const RO_LOCKED_ERROR_CODE = "101";
export const APPS_NOT_FOUND_ERROR_CODE = "12009";
export const IGNORE_ERROR_CODES = [APPS_NOT_FOUND_ERROR_CODE, RO_LOCKED_ERROR_CODE];
export const APP_COMPLETED_SCREENING_STATUS = "Completed";
export const APP_DECLINE_SCREEN_REASON = "Decline";

export const COMPANY_DOCUMENTS = "companyDocuments";
export const STAKEHOLDER_DOCUMENTS = "stakeholdersDocuments";

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

export const screeningStatus = [
  {
    error: "Dedupe",
    screeningType: "Dedupe Check"
  },
  {
    error: "Virtual Currencies",
    screeningType: "Virtual Currency Check"
  },
  {
    error: "not Eligible",
    screeningType: "RAKStarter Account Check",
    link: true
  },
  {
    error: "Not Registered In UAE",
    screeningType: "CountryOfIncorporation Check"
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
    screeningType: "IsShareHolderACompany Check"
  }
];

export const screeningStatusDefault = {
  error: "Default",
  text:
    "We apologise that we are unable to offer you a product. Thank you for your interest in RAKBANK"
};

export const stakeholderScreeningStatus = {
  error: "Big Company",
  icon: callbackRegular,
  text: (
    <>
      Wow, you’re a big company!
      <br /> Let us save you time and have someone call you within 1 day to meet you in person and
      help you out.
    </>
  )
};

export const screeningStatusNotRegistered = {
  error: "Not Registered In UAE",
  icon: callbackRegular,
  text: (
    <>
      It looks like your company is not registered in the UAE. <br />
      But no worries! Let’s have someone call you back within 1 day to <br />
      meet you in person and help you out.
    </>
  )
};

export const DATE_FORMAT = "yyyy-MM-dd";

export const queryParams = {
  PRODUCT: "product",
  IS_ISLAMIC: "type"
};
export const ISLAMIC_BANK = "RAKislamic";
export const CONVENTIONAL_BANK = "Conventional";
export const BYTES_IN_MEGABYTE = 1048576;

export const VIEW_IDS = {
  SubmitApplication: "/SubmitApplication",
  SearchProspect: "/SearchProspect",
  CompanyInfo: "/CompanyInfo",
  SearchedAppInfo: "/SearchedAppInfo",
  ApplicationSubmitted: "/ApplicationSubmitted"
};

export const ACTION_TYPES = {
  save: "save",
  submit: "submit"
};

export const SOLE_PROPRIETOR = "1";

export const STEP_STATUS = {
  AVAILABLE: "AVAILABLE",
  NOT_AVAILABLE: "NOT_AVAILABLE",
  COMPLETED: "COMPLETED"
};

// Company Check list
export const NEGATIVE_LIST_CHECK = {
  screeningType: "Negative List Check",
  screeningStatus: "Completed",
  screeningLabel: "Negative List",
  screeningReason: "No Match"
};
export const VIRTUAL_CURRENCY_CHECK = {
  screeningType: "Virtual Currency Check",
  screeningStatus: "Completed",
  screeningLabel: "Virtual Currency",
  screeningReason: "No Match"
};
export const COUNTRYOFINCORPORATION_CHECK = {
  screeningType: "CountryOfIncorporation Check",
  screeningStatus: "Completed",
  screeningLabel: "Country of Incorporation",
  screeningReason: "No Match"
};
export const RAKSTARTER_ACCOUNT_CHECK = {
  screeningType: "RAKStarter Account Check",
  screeningStatus: "Completed",
  screeningLabel: "RAK-Starter Account Validation",
  screeningReason: "No Match"
};
export const DEDUPE_CHECK = {
  screeningType: "Dedupe Check",
  screeningStatus: "Completed",
  screeningLabel: "Dedupe",
  screeningReason: "No Match"
};
export const ISSHAREHOLDERACOMPANY_CHECK = {
  screeningType: "IsShareHolderACompany Check",
  screeningStatus: "Completed",
  screeningLabel: "Company is a Stakeholder",
  screeningReason: "No Match"
};
export const SHAREHOLDERCOUNT_CHECK = {
  screeningType: "ShareHolderCount Check",
  screeningStatus: "Completed",
  screeningLabel: "Share Holder Count",
  screeningReason: "No Match"
};
export const BLACKLIST_CHECK = {
  screeningType: "Blacklist Check",
  screeningStatus: "Completed",
  screeningLabel: "Blacklist",
  screeningReason: "No Match"
};
export const TOO_MANY_STAKEHOLDERS = {
  screeningType: "Too many Stakeholders Check",
  screeningStatus: "Completed",
  screeningLabel: "Too many Stakeholders",
  screeningReason: "No Match"
};
export const RISK_RATING = {
  screeningType: "Risk Rating",
  screeningStatus: "Completed",
  screeningLabel: "Risk Rating",
  screeningReason: "No Match"
};

export const COMPANY_CHECK_NAMES = [
  DEDUPE_CHECK,
  BLACKLIST_CHECK,
  NEGATIVE_LIST_CHECK,
  COUNTRYOFINCORPORATION_CHECK,
  VIRTUAL_CURRENCY_CHECK,
  RAKSTARTER_ACCOUNT_CHECK,
  ISSHAREHOLDERACOMPANY_CHECK,
  TOO_MANY_STAKEHOLDERS
];
