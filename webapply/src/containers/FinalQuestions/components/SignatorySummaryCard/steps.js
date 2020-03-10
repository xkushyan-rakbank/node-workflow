import { SignatoryEmploymentDetails } from "./SignatorySummarySteps/SignatoryEmploymentDetails";
import { SignatorySourceOfFunds } from "./SignatorySummarySteps/SignatorySourceOfFunds";
import { SignatoryPersonalInformation } from "./SignatorySummarySteps/SignatoryPersonalInformation";
import { SignatoryPreferredMailingAddress } from "./SignatorySummarySteps/SignatoryPreferredMailingAddress";
import { GA_EVENTS } from "../../../../utils/ga";
import { STEP_1, STEP_2, STEP_3, STEP_4 } from "./constants";

export const signatoriesSteps = [
  {
    step: STEP_1,
    title: "Personal Information",
    component: SignatoryPersonalInformation,
    eventName: GA_EVENTS.FINAL_QUESTION_PERSONAL_INFORMATION_CONTINUE
  },
  {
    step: STEP_2,
    title: "Employment details",
    component: SignatoryEmploymentDetails,
    eventName: GA_EVENTS.FINAL_QUESTION_EMPLOYMENT_CONTINUE
  },
  {
    step: STEP_3,
    title: "Source of funds",
    component: SignatorySourceOfFunds,
    eventName: GA_EVENTS.FINAL_QUESTION_SOURCE_OF_FUND_CONTINUE
  },
  {
    step: STEP_4,
    title: "Preferred mailing address",
    component: SignatoryPreferredMailingAddress,
    eventName: GA_EVENTS.FINAL_QUESTION_PREFERRED_MAILING_ADDRESS_CONTINUE
  }
];
