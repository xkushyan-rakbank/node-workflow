import PersonalInformation from "./components/StepForms/PersonalInformation";
import SignatoryRights from "./components/StepForms/SignatoryRights";
import Shareholding from "./components/StepForms/Shareholding";
import Nationality from "./components/StepForms/Nationality";
import CountryOfResidence from "./components/StepForms/CountryOfResidence";
import PublicPosition from "./components/StepForms/PublicPosition";
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

export const nationality = [
  { value: "Nationality1", label: "Nationality1" },
  { value: "Nationality2", label: "Nationality2" }
];

export const countryOfResidence = [
  { value: "Country Of Residence1", label: "Country Of Residence1" },
  { value: "Country Of Residence2", label: "Country Of Residence2" }
];

export const publicPositions = [
  { value: "Never held", label: "Never held" },
  { value: "Yes", label: "Yes" }
];

export const codes = [
  {
    value: "USA",
    label: "+791"
  },
  {
    value: "EUR",
    label: "+992"
  },
  {
    value: "UA",
    label: "+291"
  },
  {
    value: "GB",
    label: "+391"
  }
];

export const fieldAttr = (id, fieldConfig) => {
  return {
    id: fieldConfig.id,
    type: fieldConfig.type || "text",
    name: fieldConfig.name,
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
  { step: 6, title: "Somthing Else", path: undefined }
];
