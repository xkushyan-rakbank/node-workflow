import { SignatoryEmploymentDetails } from "./SignatorySummarySteps/SignatoryEmploymentDetails";
import { SignatorySourceOfFunds } from "./SignatorySummarySteps/SignatorySourceOfFunds";
import { SignatoryPersonalInformation } from "./SignatorySummarySteps/SignatoryPersonalInformation";
import { SignatoryPreferredMailingAddress } from "./SignatorySummarySteps/SignatoryPreferredMailingAddress";

export const SIGNATORY_INITIAL_INDEX = 0;

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;
export const STEP_4 = 4;

export const MAX_MOTHERS_MAIDEN_NAME_LENGTH = 30;
export const MAX_LENGTH_MARITAL_OTHERS_STATUS = 20;

export const COMPANY_SIGNATORY_ID = "companySignatory_";

export const signatoriesSteps = [
  {
    step: STEP_1,
    title: "Personal Information",
    component: SignatoryPersonalInformation
  },
  {
    step: STEP_2,
    title: "Employment details",
    component: SignatoryEmploymentDetails
  },
  {
    step: STEP_3,
    title: "Source of funds",
    component: SignatorySourceOfFunds
  },
  {
    step: STEP_4,
    title: "Preferred mailing address",
    component: SignatoryPreferredMailingAddress
  }
];
