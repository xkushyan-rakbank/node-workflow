import { CompanyDetails } from "./components/CompanyDetails";
import { Industry } from "./components/Industry";
import { LicenseInformation } from "./components/LicenseInformation";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;

export const companyInfoSteps = [
  {
    step: STEP_1,
    title: "Company Details",
    component: CompanyDetails
  },
  {
    step: STEP_2,
    title: "Industry",
    component: Industry
  },
  { step: STEP_3, title: "Licence Information", component: LicenseInformation }
];
