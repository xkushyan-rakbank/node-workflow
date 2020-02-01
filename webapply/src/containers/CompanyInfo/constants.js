import { CompanyDetails } from "./components/CompanyDetails";
import { Industry } from "./components/Industry";
import { LicenseInformation } from "./components/LicenseInformation";
import { events } from "../../utils/ga";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;

export const MAX_COMPANY_NAME_LENGTH = 30;
export const MAX_REGISTRATION_NUMBER_LENGTH = 15;
export const MAX_LICENSE_NUMBER_LENGTH = 20;

export const companyInfoSteps = [
  {
    step: STEP_1,
    title: "Company Details",
    component: CompanyDetails,
    event_name: events.COMPANY_INFORMATION_DETAILS_CONTINUE
  },
  {
    step: STEP_2,
    title: "Industry",
    component: Industry,
    event_name: events.COMPANY_INFORMATION_INDUSTRY_CONTINUE
  },
  {
    step: STEP_3,
    title: "License Information",
    component: LicenseInformation,
    event_name: events.COMPANY_INFORMATION_LICENSE_CONTINUE
  }
];
