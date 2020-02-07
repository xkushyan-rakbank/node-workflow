import { PersonalInformation } from "./components/PersonalInformation/PersonalInformation";
import { SignatoryRights } from "./components/SignatoryRights/SignatoryRights";
import { Shareholding } from "./components/Shareholding/Shareholding";
import { Nationality } from "./components/Nationality/Nationality";
import { CountryOfResidence } from "./components/CountryOfResidence/CountryOfResidence";
import { PreferredContactInformation } from "./components/PreferredContactInformation/PreferredContactInformation";

export const FULL_NAME_MAX_LENGTH = 79;
export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;
export const STEP_4 = 4;
export const STEP_5 = 5;
export const STEP_6 = 6;
export const stakeHoldersSteps = [
  {
    step: STEP_1,
    title: "Personal Information",
    component: PersonalInformation
  },
  {
    step: STEP_2,
    title: "Signatory Rights",
    component: SignatoryRights
  },
  { step: STEP_3, title: "Shareholding", component: Shareholding },
  { step: STEP_4, title: "Nationality", component: Nationality },
  {
    step: STEP_5,
    title: "Country of residence",
    component: CountryOfResidence
  },
  {
    step: STEP_6,
    title: "Preferred contact information",
    component: PreferredContactInformation
  }
];
