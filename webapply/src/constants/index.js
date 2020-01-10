import routes from "../routes";

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
export const MAX_STAKEHOLDERS_LENGTH = 6;

export const IS_RECAPTCHA_ENABLE = process.env.REACT_APP_RECAPTCHA_ENABLE !== "N";

export const REQUEST_LOADING = "loading";
export const REQUEST_SUCCESS = "success";
export const REQUEST_FAILED = "error";

export const mobileResolution = 955;
