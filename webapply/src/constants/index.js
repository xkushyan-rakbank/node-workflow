import routes from "../routes";
import callbackRegular from "./../assets/gif/callback_regular.gif";
import declinedRegular from "./../assets/gif/declined_regular.gif";

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
  { step: 4, title: "Final questions", path: routes.finalQuestions },
  { step: 5, title: "Upload Documents", path: routes.uploadDocuments },
  { step: 6, title: "Select services", path: routes.selectServices }
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
  needCommunicationLabel: "I want to receive marketing and promotional communication from RakBank"
};

export const accountNames = {
  starter: "RAKStarter",
  currentAccount: "Current Account",
  elite: "RAKelite"
};

export const UAE_CODE = "971";
export const UAE = "AE";
export const UAE_CURRENCY = "AED";
export const MAX_STAKEHOLDERS_LENGTH = 12;
export const MAX_EMAIL_LENGTH = 50;

export const REQUEST_LOADING = "loading";
export const REQUEST_SUCCESS = "success";
export const REQUEST_FAILED = "error";

export const mobileResolution = 955;
export const normalScrollHeight = 740;

export const APP_STOP_SCREEN_RESULT = "stop";
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

export const SIGNING_TRANSACTIONS_TYPE_ANY = "A1";

export const screeningStatus = [
  {
    error: "Dedupe",
    icon: callbackRegular,
    screeningType: "Dedupe Check"
  },
  {
    error: "Virtual Currencies",
    icon: declinedRegular,
    screeningType: "Virtual Currency Check"
  },
  {
    error: "not Eligible",
    icon: callbackRegular,
    screeningType: "RAKStarter Account Check",
    link: true
  },
  {
    error: "Not Registered In UAE",
    icon: callbackRegular,
    screeningType: "CountryOfIncorporation Check"
  },
  {
    error: "Big Company",
    icon: callbackRegular,
    screeningType: "ShareHolderCount Check"
  },
  {
    error: "BlackList",
    icon: declinedRegular,
    screeningType: "Blacklist Check"
  },
  {
    error: "Company as stakeholder",
    icon: callbackRegular,
    screeningType: "IsShareHolderACompany Check"
  }
];

export const screeningStatusDefault = {
  error: "Default",
  icon: declinedRegular,
  text:
    "We apologise that we are unable to offer you a product. Thank you for your interest in RAKBANK"
};

export const DATE_FORMAT = "yyyy-MM-dd";

export const queryParams = {
  PRODUCT: "product",
  IS_ISLAMIC: "type"
};
export const ISLAMIC_BANK = "RAKislamic";
export const CONVENTIONAL_BANK = "Conventional";
