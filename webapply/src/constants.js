import PersonalInformation from "./components/StakeholderStepForms/PersonalInformation";
import SignatoryRights from "./components/StakeholderStepForms/SignatoryRights";
import Shareholding from "./components/StakeholderStepForms/Shareholding";
import Nationality from "./components/StakeholderStepForms/Nationality";
import CountryOfResidence from "./components/StakeholderStepForms/CountryOfResidence";
import PublicPosition from "./components/StakeholderStepForms/PublicPosition";
import AccountDetails from "./components/ServicesStepForms/AccountDetails";
import SigningPreferences from "./components/ServicesStepForms/SigningPreferences";
import Channels from "./components/ServicesStepForms/Channels";
import routes from "./routes";

export const stakeHoldersSteps = [
  {
    step: 1,
    title: "Personal Information",
    infoTitle: "This section should be the same as in the person's passport",
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
    title: "Public position",
    component: PublicPosition
  }
];

export const gender = [
  { value: "Mr.", label: "Mr." },
  { value: "Ms.", label: "Ms." }
];

export const maritalStatus = [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" }
];

export const personSignatory = [
  { value: true, label: "Yes" },
  { value: false, label: "No" }
];

export const authorityType = [
  { value: "AuthorityType1", label: "AuthorityType1" },
  { value: "AuthorityType2", label: "AuthorityType2" }
];

export const countryOfResidence = [
  { value: "Country Of Residence1", label: "Country Of Residence1" },
  { value: "Country Of Residence2", label: "Country Of Residence2" }
];

export const publicPositions = [
  { value: "Never held", label: "Never held" },
  { value: "Yes", label: "Yes" }
];

export const fieldAttr = (id, fieldConfig) => {
  return {
    id: id,
    type: fieldConfig.type || "text",
    min: fieldConfig.min,
    max: fieldConfig.max,
    maxLength: fieldConfig.maxlength,
    pattern: fieldConfig.pattern,
    required: !!fieldConfig.required,
    disabled: !!fieldConfig.disabled,
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
  { step: 5, title: "Upload Documents", path: undefined },
  { step: 6, title: "Select services", path: routes.selectServices }
];

export const servicesSteps = [
  {
    step: 1,
    title: "Account details",
    component: AccountDetails
  },
  {
    step: 2,
    title: "Signing preferences",
    component: SigningPreferences
  },
  { step: 3, title: "Channels", component: Channels }
];
