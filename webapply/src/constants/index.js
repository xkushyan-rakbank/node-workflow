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

export const accountsNames = {
  starter: "RAKstarter",
  currentAccount: "Current Account",
  elite: "RAKelite"
};

export const UAE_CODE = "971";
export const UAE = "AE";
export const UAE_CURRENCY = "AED";
export const MAX_STAKEHOLDERS_LENGTH = 12;

export const IS_RECAPTCHA_ENABLE = process.env.REACT_APP_RECAPTCHA_ENABLE !== "N";

export const REQUEST_LOADING = "loading";
export const REQUEST_SUCCESS = "success";
export const REQUEST_FAILED = "error";

export const mobileResolution = 955;

export const APP_STOP_SCREEN_RESULT = "Stop";

export const COMPANY_DOCUMENTS = "companyDocuments";
export const STAKEHOLDER_DOCUMENTS = "stakeholdersDocuments";

export const SUBMIT = "submit";
export const NEXT = "NEXT";

export const screeningStatus = {
  dedupe: {
    error: "Dedupe",
    icon: callbackRegular,
    text:
      "It looks like we already know you and have your details! Let us save you time. We will call you back within X days to meet you in person and help you out."
  },
  virtualCurrencies: {
    error: "Virtual Currencies",
    icon: declinedRegular,
    text:
      "We apologise that we are unable to offer you a product as the details provided don’t meet out requirements. Thank you for your interest in RAKBANK."
  },
  notEligible: {
    error: "not Eligible",
    icon: callbackRegular,
    text:
      "Oops, this product is not for you. Our RAKstarter account is for companies operating for less than a year. But don’t worry, we have other products suited for you.",
    link: true
  },
  notRegisteredInUAE: {
    error: "Not Registered In UAE",
    icon: declinedRegular,
    text:
      "It looks like your company is not registered in the UAE. But no worries! Let’s have someone call you back within X days to meet you in person and help you out."
  },
  bigCompany: {
    error: "Big Company",
    icon: callbackRegular,
    text:
      "Wow, you’re a big company!\n" +
      "Let us save you time and have someone call you within X days to meet you in person and help you out."
  },
  blackList: {
    error: "BlackList",
    icon: declinedRegular,
    text:
      "We apologise that we are unable to offer you a product as the details provided don’t meet out requirements. Thank you for your interest in RAKBANK."
  },
  isShareholderACompany: {
    error: "Company as stakeholder",
    icon: callbackRegular,
    text:
      "Let’s make this easy for you! Since you have other companies listed as shareholders, let’s have someone call you back within X days to meet you in person and help you out."
  },
  default: {
    error: "Default",
    icon: declinedRegular,
    text:
      "We apologise that we are unable to offer you a product. Thank you for your interest in RAKBANK"
  }
};

export const screeningTypes = {
  virtualCurrency: "Virtual Currency Check",
  countryOfIncorporation: "CountryOfIncorporation Check",
  isShareHolderACompany: "IsShareHolderACompany Check",
  RAKStarterAccount: "RAKStarter Account Check",
  dedupe: "Dedupe Check",
  blacklist: "Blacklist Check",
  isTooManyStakeholders: "ShareHolderCount Check"
};
