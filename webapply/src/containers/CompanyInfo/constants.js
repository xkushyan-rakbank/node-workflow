import { CompanyDetails } from "./components/CompanyDetails";
import { Industry } from "./Industry";
import { LicenseInformation } from "./components/LicenseInformation";
import { GA_EVENTS } from "../../utils/ga";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;

export const MAX_COMPANY_NAME_LENGTH = 50;
export const MAX_REGISTRATION_NUMBER_LENGTH = 15;
export const MAX_LICENSE_NUMBER_LENGTH = 20;
export const MAX_YEARS_IN_BUSINESS_LENGTH = 3;
export const MAX_INDUSTRIES_LENGTH = 12;

export const companyInfoSteps = [
  {
    step: STEP_1,
    title: "Company Details",
    component: CompanyDetails,
    eventName: GA_EVENTS.COMPANY_INFORMATION_DETAILS_CONTINUE
  },
  {
    step: STEP_2,
    title: "Industry",
    component: Industry,
    eventName: GA_EVENTS.COMPANY_INFORMATION_INDUSTRY_CONTINUE
  },
  {
    step: STEP_3,
    title: "License Information",
    component: LicenseInformation,
    eventName: GA_EVENTS.COMPANY_INFORMATION_LICENSE_CONTINUE
  }
];

export const COMPANY_INFO_PAGE_ID = "companyInfo";
