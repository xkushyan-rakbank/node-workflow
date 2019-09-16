import PersonalInformation from "./components/StakeholderStepForms/PersonalInformation";
import SignatoryRights from "./components/StakeholderStepForms/SignatoryRights";
import Shareholding from "./components/StakeholderStepForms/Shareholding";
import Nationality from "./components/StakeholderStepForms/Nationality";
import CountryOfResidence from "./components/StakeholderStepForms/CountryOfResidence";
import AccountDetails from "./components/ServicesStepForms/AccountDetails";
import SigningPreferences from "./components/ServicesStepForms/SigningPreferences";
import Channels from "./components/ServicesStepForms/Channels";
import CompanyDetails from "./components/AboutCompanyStepForms/CompanyDetails";
import Industry from "./components/AboutCompanyStepForms/Industry";
import LicenseInformation from "./components/AboutCompanyStepForms/LicenseInformation";
import isUndefined from "lodash/isUndefined";
import isArray from "lodash/isArray";

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
