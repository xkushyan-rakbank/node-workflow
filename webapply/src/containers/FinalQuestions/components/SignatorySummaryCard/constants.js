import SignatoryEmploymentDetailsForm from "./SignatorySummarySteps/SignatoryEmploymentDetailsForm";
import SignatorySourceOfFundsForm from "./SignatorySummarySteps/SignatorySourceOfFundsForm";
import SignatoryPersonalInformationForm from "./SignatorySummarySteps/SignatoryPersonalInformationForm";
import SignatoryPreferredMailingAddressForm from "./SignatorySummarySteps/SignatoryPreferredMailingAddressForm";

export const INITIAL_SIGNATORY_STEP = 1;

export const signatoriesSteps = [
  {
    step: 1,
    title: "Personal Information",
    component: SignatoryPersonalInformationForm
  },
  {
    step: 2,
    title: "Employment details",
    component: SignatoryEmploymentDetailsForm
  },
  {
    step: 3,
    title: "Source of funds",
    component: SignatorySourceOfFundsForm
  },
  {
    step: 4,
    title: "Preferred mailing address",
    component: SignatoryPreferredMailingAddressForm
  }
];
