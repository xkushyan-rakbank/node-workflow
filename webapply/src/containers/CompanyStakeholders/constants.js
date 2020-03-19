import { PersonalInformation } from "./components/PersonalInformation/PersonalInformation";
import { SignatoryRights } from "./components/SignatoryRights/SignatoryRights";
import { Shareholding } from "./components/Shareholding/Shareholding";
import { Nationality } from "./components/Nationality/Nationality";
import { CountryOfResidence } from "./components/CountryOfResidence/CountryOfResidence";
import { PreferredContactInformation } from "./components/PreferredContactInformation/PreferredContactInformation";
import { GA_EVENTS } from "../../utils/ga";

export const FULL_NAME_MAX_LENGTH = 77;
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
    component: PersonalInformation,
    eventName: GA_EVENTS.COMPANY_STAKEHOLDER_PERSONAL_INFORMATION_CONTINUE
  },
  {
    step: STEP_2,
    title: "Signatory Rights",
    component: SignatoryRights,
    eventName: GA_EVENTS.COMPANY_STAKEHOLDER_SIGNATORY_RIGHTS_CONTINUE
  },
  {
    step: STEP_3,
    title: "Shareholding",
    component: Shareholding,
    eventName: GA_EVENTS.COMPANY_STAKEHOLDER_SHAREHOLDING_CONTINUE
  },
  {
    step: STEP_4,
    title: "Nationality",
    component: Nationality,
    eventName: GA_EVENTS.COMPANY_STAKEHOLDER_NATIONALITY_CONTINUE
  },
  {
    step: STEP_5,
    title: "Country of residence",
    component: CountryOfResidence,
    eventName: GA_EVENTS.COMPANY_STAKEHOLDER_COUNTRY_OF_RESIDENCE_CONTINUE
  },
  {
    step: STEP_6,
    title: "Preferred contact information",
    component: PreferredContactInformation,
    eventName: GA_EVENTS.COMPANY_STAKEHOLDER_PREFERRED_CONTACT_CONTINUE
  }
];

export const FIELDS = ["firstName", "middleName", "lastName", "id"];

export const COMPANY_STAKEHOLDER_ID = "companyStakeholder_";
