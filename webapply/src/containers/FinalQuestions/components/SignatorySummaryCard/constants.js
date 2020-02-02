import { SignatoryEmploymentDetails } from "./SignatorySummarySteps/SignatoryEmploymentDetails";
import { SignatorySourceOfFunds } from "./SignatorySummarySteps/SignatorySourceOfFunds";
import { SignatoryPersonalInformation } from "./SignatorySummarySteps/SignatoryPersonalInformation";
import { SignatoryPreferredMailingAddress } from "./SignatorySummarySteps/SignatoryPreferredMailingAddress";
import { GA_EVENTS } from "../../../../utils/ga";

export const SIGNATORY_INITIAL_INDEX = 0;

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;
export const STEP_4 = 4;

export const MAX_MOTHERS_MAIDEN_NAME_LENGTH = 30;

export const SIGNATORY_FIELD_NAME = "signatorySteps";

export const signatoriesSteps = [
  {
    step: STEP_1,
    title: "Personal Information",
    component: SignatoryPersonalInformation,
    event_name: GA_EVENTS.FINAL_QUESTION_PERSONAL_INFORMATION_CONTINUE
  },
  {
    step: STEP_2,
    title: "Employment details",
    component: SignatoryEmploymentDetails,
    event_name: GA_EVENTS.FINAL_QUESTION_EMPLOYMENT_CONTINUE
  },
  {
    step: STEP_3,
    title: "Source of funds",
    component: SignatorySourceOfFunds,
    event_name: GA_EVENTS.FINAL_QUESTION_SOURCE_OF_FUND_CONTINUE
  },
  {
    step: STEP_4,
    title: "Preferred mailing address",
    component: SignatoryPreferredMailingAddress,
    event_name: GA_EVENTS.FINAL_QUESTION_PREFERRED_MAILING_ADDRESS_CONTINUE
  }
];
