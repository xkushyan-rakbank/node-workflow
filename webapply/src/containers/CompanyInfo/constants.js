import { CompanyDetails } from "./components/CompanyDetails";
import { Industry } from "./components/Industry";
import { LicenseInformation } from "./components/LicenseInformation";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;

export const MAX_COMPANY_NAME_LENGTH = 30;
export const MAX_REGISTRATION_NUMBER_LENGTH = 15;
export const MAX_LICENSE_NUMBER_LENGTH = 20;
export const MAX_YEARS_IN_BUSINESS_LENGTH = 3;
export const MAX_INDUSTRIES_LENGTH = 12;

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
  { step: STEP_3, title: "License Information", component: LicenseInformation }
];

export const SubIndustryHelperText =
  "This should be selected as per the most relevant business / commercial / licensed activity mentioned in the trade license. \n\n Example: \nIf business / commercial / licensed activity is 'E Commerce', please select industry as 'Services' & sub-industry as 'Computer & IT Industry'";
