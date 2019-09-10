import PersonalInformation from "./components/StakeholderStepForms/PersonalInformation";
import SignatoryRights from "./components/StakeholderStepForms/SignatoryRights";
import Shareholding from "./components/StakeholderStepForms/Shareholding";
import Nationality from "./components/StakeholderStepForms/Nationality";
import CountryOfResidence from "./components/StakeholderStepForms/CountryOfResidence";
import AccountDetails from "./components/ServicesStepForms/AccountDetails";
import SigningPreferences from "./components/ServicesStepForms/SigningPreferences";
import Channels from "./components/ServicesStepForms/Channels";
import isUndefined from "lodash/isUndefined";

import routes from "./routes";

export const DATA_ATTRIBUTES = {
  INPUT_ID: "data-config-id"
};

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
  }
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

export const defineInputFormatByConfig = fieldConfig => {
  switch (fieldConfig.format) {
    case "amount":
      return "number";
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

export const fieldAttr = (id, fieldConfig, name) => {
  return {
    [DATA_ATTRIBUTES.INPUT_ID]: id,
    id: name,
    type: defineInputFormatByConfig(fieldConfig),
    min: fieldConfig.min,
    max: fieldConfig.max,
    maxLength: defineInputMaxLengthByConfig(fieldConfig),
    minLength: defineInputMinLengthByConfig(fieldConfig),
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

export const digitRegExp = new RegExp("^[0-9]$");
