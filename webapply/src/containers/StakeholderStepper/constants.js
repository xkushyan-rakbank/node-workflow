import PersonalInformation from "../../components/StakeholderStepForms/PersonalInformation/PersonalInformation";
import SignatoryRights from "../../components/StakeholderStepForms/SignatoryRights";
import Shareholding from "../../components/StakeholderStepForms/Shareholding";
import Nationality from "../../components/StakeholderStepForms/Nationality/Nationality";
import CountryOfResidence from "../../components/StakeholderStepForms/CountryOfResidence";
import PreferredContactInformation from "../../components/StakeholderStepForms/PreferredContactInformation";

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
  { step: 4, title: "Nationality", component: Nationality },
  {
    step: 5,
    title: "Country of residence",
    component: CountryOfResidence
  },
  {
    step: 6,
    title: "Preferred contact information",
    component: PreferredContactInformation
  }
];
