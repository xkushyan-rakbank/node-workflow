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

export const MAX_COMPANY_NAME_LENGTH = 50;
export const MAX_REGISTRATION_NUMBER_LENGTH = 15;
export const MAX_LICENSE_NUMBER_LENGTH = 20;
export const MAX_YEARS_IN_BUSINESS_LENGTH = 3;
export const MAX_INDUSTRIES_LENGTH = 12;

export const MAX_REPRESENTED_NAME_LENGTH = 50;
export const YES_NO_OPTIONS = [
  {
    key: "yes",
    code: "yes",
    displayText: "Yes",
    value: "Yes",
    subGroup: null
  },
  {
    key: "no",
    code: "no",
    displayText: "No",
    value: "No",
    subGroup: null
  }
];
export const stakeHoldersSteps = {
  true: [
    {
      step: STEP_1,
      title: "Personal Information",
      component: PersonalInformation,
      eventName: GA_EVENTS.COMPANY_STAKEHOLDER_PERSONAL_INFORMATION_CONTINUE
    }
  ],
  false: [
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
  ]
};

export const COMPANY_STAKEHOLDER_ID = "companyStakeholder_";
