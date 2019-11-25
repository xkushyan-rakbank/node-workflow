import isUndefined from "lodash/isUndefined";
import isArray from "lodash/isArray";
import SearchedCompanyDetails from "../components/SearchedAppInfoSteps/CompanyDetails/index";
import CheckList from "../components/SearchedAppInfoSteps/CheckList/index";
import Documents from "../components/SearchedAppInfoSteps/Documents/index";
import AuditTrail from "../components/SearchedAppInfoSteps/AuditTrail/index";
import CompanyBusinessRelationshipsForm from "../components/FinalQuestions/CompanyBusinessRelationshipsForm";
import CompanyPreferredContactInformationForm from "../components/FinalQuestions/CompanyPreferredContactInformationForm";
import CompanyPreferredMailingAddressForm from "../components/FinalQuestions/CompanyPreferredMailingAddressForm";
import CompanyBranchesAndSubsidiariesForm from "../components/FinalQuestions/CompanyBranchesAndSubsidiariesForm";
import CompanyAnticipatedTransactionsForm from "../components/FinalQuestions/CompanyAnticipatedTransactionsForm";
import routes from "../routes";
import SignatoryPersonalInformationForm from "../components/FinalQuestions/SignatoryPersonalInformationForm";
import SignatorySourceOfFundsForm from "../components/FinalQuestions/SignatorySourceOfFundsForm";
import SignatoryPreferredMailingAddressForm from "../components/FinalQuestions/SignatoryPreferredMailingAddressForm";
import SignatoryEmploymentDetailsForm from "../components/FinalQuestions/SignatoryEmploymentDetailsForm";
import callbackRegular from "./../assets/gif/callback_regular.gif";
import declinedRegular from "./../assets/gif/declined_regular.gif";

export const finalQuestionsSteps = [
  {
    step: 1,
    title: "Business relationships",
    component: CompanyBusinessRelationshipsForm
  },
  {
    step: 2,
    title: "Branches and subsidiaries",
    component: CompanyBranchesAndSubsidiariesForm
  },
  {
    step: 3,
    title: "Anticipated transactions",
    component: CompanyAnticipatedTransactionsForm
  },
  {
    step: 4,
    title: "Preferred mailing address",
    component: CompanyPreferredMailingAddressForm
  },
  {
    step: 5,
    title: "Preferred contact information",
    component: CompanyPreferredContactInformationForm
  }
];

export const signatoriesSteps = [
  {
    step: 1,
    title: "Personal Information",
    component: SignatoryPersonalInformationForm
  },
  {
    step: 2,
    title: "Employment details",
    component: SignatoryEmploymentDetailsForm
  },
  {
    step: 3,
    title: "Source of funds",
    component: SignatorySourceOfFundsForm
  },
  {
    step: 4,
    title: "Preferred mailing address",
    component: SignatoryPreferredMailingAddressForm
  }
];

export const authorityType = [
  { value: "AuthorityType1", label: "AuthorityType1" },
  { value: "AuthorityType2", label: "AuthorityType2" }
];

export const defineDynamicInputId = (id, indexes) => {
  if (isArray(indexes) && indexes.length > 0) {
    return `${id}_${indexes.join("_")}`;
  }
  return id;
};

export const defineInputFormatByConfig = fieldConfig => {
  switch (fieldConfig.format) {
    case "amount":
      return "number";
    case "email":
      return "email";
    case "date":
      return "text";
    default:
      return "text";
  }
};

export const defineInputMaxLengthByConfig = fieldConfig => {
  const type = defineInputFormatByConfig(fieldConfig);
  if (type !== "text" || isUndefined(fieldConfig.max)) {
    return fieldConfig.maxlength;
  }
  return fieldConfig.max;
};

export const defineInputMinLengthByConfig = fieldConfig => {
  const type = defineInputFormatByConfig(fieldConfig);
  if (type !== "text" || isUndefined(fieldConfig.min)) {
    return fieldConfig.minlength;
  }
  return fieldConfig.min;
};

export const fieldAttr = (id, fieldConfig, indexes) => {
  return {
    id: defineDynamicInputId(id, indexes),
    type: defineInputFormatByConfig(fieldConfig),
    min: fieldConfig.min,
    max: fieldConfig.max,
    maxLength: defineInputMaxLengthByConfig(fieldConfig),
    minLength: defineInputMinLengthByConfig(fieldConfig),
    pattern: fieldConfig.pattern,
    required: !!fieldConfig.required,
    readOnly: !!fieldConfig.readOnly
  };
};

export const errorType = {
  required: "required",
  invalid: "invalid",
  multiline: "multiline"
};

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

export const searchedAppInfoSteps = [
  {
    step: 1,
    title: "Details",
    component: SearchedCompanyDetails
  },
  {
    step: 2,
    title: "Checks",
    component: CheckList
  },
  { step: 3, title: "Documents", component: Documents },
  { step: 4, title: "Audit Trail", component: AuditTrail }
];

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

export const applicationStatus = {
  dedupe: {
    icon: callbackRegular,
    text:
      "It looks like we already know you and have your details! Let us save you time. We will call you back within X days to meet you in person and help you out."
  },
  virtualCurrencies: {
    icon: declinedRegular,
    text:
      "We apologise that we are unable to offer you a product as the details provided don’t meet out requirements. Thank you for your interest in RAKBANK."
  },
  blNlMatch: {
    icon: declinedRegular,
    text:
      "We apologise that we are unable to offer you a product as the details provided don’t meet out requirements. Thank you for your interest in RAKBANK."
  },
  notEligible: {
    icon: declinedRegular,
    text:
      "Oops, this product is not for you. Our RAKstarter account is for companies operating for less than a year. But don’t worry, we have other products suited for you."
  },
  uiError: {
    icon: declinedRegular,
    text:
      "It`s our fault, not yours. We`ve have been notified of the problem. In the meantime, try refreshing or see the JavaScript console for technical details."
  }
};

export const IS_RECAPTCHA_ENABLE = false;

export const REQUEST_LOADING = "loading";
export const REQUEST_SUCCESS = "success";
export const REQUEST_FAILED = "error";
