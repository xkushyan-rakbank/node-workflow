import { SignatoryEmploymentDetails } from "./SignatorySummarySteps/SignatoryEmploymentDetails";
import { SignatorySourceOfFunds } from "./SignatorySummarySteps/SignatorySourceOfFunds";
import { SignatoryPersonalInformation } from "./SignatorySummarySteps/SignatoryPersonalInformation";
import SignatoryPreferredMailingAddressForm from "./SignatorySummarySteps/SignatoryPreferredMailingAddressForm";

export const INITIAL_SIGNATORY_STEP = 1;

export const signatoriesSteps = [
  {
    step: 1,
    title: "Personal Information",
    component: SignatoryPersonalInformation
  },
  {
    step: 2,
    title: "Employment details",
    component: SignatoryEmploymentDetails
  },
  {
    step: 3,
    title: "Source of funds",
    component: SignatorySourceOfFunds
  },
  {
    step: 4,
    title: "Preferred mailing address",
    component: SignatoryPreferredMailingAddressForm
  }
];
