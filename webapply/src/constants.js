import React from "react";
import PersonalInformation from "./components/StepForms/PersonalInformation";
import SignatoryRights from "./components/StepForms/SignatoryRights";
import Shareholding from "./components/StepForms/Shareholding";

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
  { step: 4, title: "Nationality", component: () => <div>Nationality</div> },
  {
    step: 5,
    title: "Country of residence",
    component: () => <div>Country of residence</div>
  },
  {
    step: 6,
    title: "Employment details",
    component: () => <div>Employment details</div>
  },
  {
    step: 7,
    title: "Preferred contact information",
    component: () => <div>Preferred contact information</div>
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
