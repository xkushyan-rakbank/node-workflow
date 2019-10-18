import isUndefined from "lodash/isUndefined";
import isArray from "lodash/isArray";
import PersonalInformation from "../components/StakeholderStepForms/PersonalInformation";
import SignatoryRights from "../components/StakeholderStepForms/SignatoryRights";
import Shareholding from "../components/StakeholderStepForms/Shareholding";
import Nationality from "../components/StakeholderStepForms/Nationality";
import CountryOfResidence from "../components/StakeholderStepForms/CountryOfResidence";
import PreferredContactInformation from "../components/StakeholderStepForms/PreferredContactInformation";
import AccountDetails from "../components/ServicesStepForms/AccountDetails";
import SigningPreferences from "../components/ServicesStepForms/SigningPreferences";
import Channels from "../components/ServicesStepForms/Channels";
import ValueAddedServices from "../components/ServicesStepForms/ValueAddedServices";
import CompanyDetails from "../components/AboutCompanyStepForms/CompanyDetails";
import Industry from "../components/AboutCompanyStepForms/Industry";
import LicenseInformation from "../components/AboutCompanyStepForms/LicenseInformation";
import accountDetails from "../assets/icons/account_details.png";
import signingPreferences from "../assets/icons/signing_preferences.png";
import channels from "../assets/icons/channels.png";
import valueAddedServices from "../assets/icons/value_added_services.png";
import decline from "../assets/gif/declined_regular.gif";
import SearchedCompanyDetails from "../components/SearchedAppInfoSteps/CompanyDetails";
import CheckList from "../components/SearchedAppInfoSteps/CheckList";
import Documents from "../components/SearchedAppInfoSteps/Documents";
import AuditTrail from "../components/SearchedAppInfoSteps/AuditTrail";
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

export const stakeHoldersSteps = [
  {
    step: 1,
    title: "Personal Information",
    component: PersonalInformation
  },
  {
    step: 2,
    title: "Signatory Rights",
    component: SignatoryRights
  },
  { step: 3, title: "Shareholding", component: Shareholding },
  { step: 4, title: "Nationality", component: Nationality },
  {
    step: 5,
    title: "Country of residence",
    component: CountryOfResidence
  },
  {
    step: 6,
    title: "Preferred contact information",
    component: PreferredContactInformation
  }
];

export const aboutCompanySteps = [
  {
    step: 1,
    title: "Company Details",
    component: CompanyDetails
  },
  {
    step: 2,
    title: "Industry",
    component: Industry
  },
  { step: 3, title: "Lisence Information", component: LicenseInformation }
];

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
    path: routes.searchProspect
  }
];

export const servicesSteps = [
  {
    step: 1,
    title: "Account details",
    component: AccountDetails,
    icon: accountDetails
  },
  {
    step: 2,
    title: "Signing preferences",
    component: SigningPreferences,
    icon: signingPreferences
  },
  { step: 3, title: "Channels", component: Channels, icon: channels },
  {
    step: 4,
    title: "Value added services",
    component: ValueAddedServices,
    icon: valueAddedServices
  }
];

export const digitRegExp = new RegExp("^[0-9]$");

export const applicationStatus = {
  serverError: {
    reason:
      "We're sorry, a server error occurred. Please wait a bit and try again. Thank you for your interest in RAKBANK.",
    icon: decline
  }
};

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
