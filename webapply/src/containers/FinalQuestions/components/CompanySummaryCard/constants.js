import { CompanyAnticipatedTransactions } from "./CompanySummarySteps/CompanyAnticipatedTransactions";
import { CompanyPreferredMailingAddress } from "./CompanySummarySteps/CompanyPreferredMailingAddress";
import { CompanyPreferredContactInformation } from "./CompanySummarySteps/CompanyPreferredContactInformation";
import { CompanyBusinessRelationships } from "./CompanySummarySteps/CompanyBusinessRelationships";
import { CompanyBranchesAndSubsidiaries } from "./CompanySummarySteps/CompanyBranchesAndSubsidiaries";
import { events } from "../../../../utils/ga";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;
export const STEP_4 = 4;
export const STEP_5 = 5;

export const COMPANY_FIELD_NAME = "companySteps";

export const FINAL_QUESTIONS_PAGE = "finalQuestions";

export const finalQuestionsSteps = [
  {
    step: STEP_1,
    title: "Business relationships",
    component: CompanyBusinessRelationships,
    event_name: events.FINAL_QUESTION_BUSINESS_RELATIONSHIPS_CONTINUE
  },
  {
    step: STEP_2,
    title: "Branches and subsidiaries",
    component: CompanyBranchesAndSubsidiaries,
    event_name: events.FINAL_QUESTION_BRANCHES_CONTINUE
  },
  {
    step: STEP_3,
    title: "Anticipated transactions",
    component: CompanyAnticipatedTransactions,
    event_name: events.FINAL_QUESTION_ANTICIPATED_CONTINUE
  },
  {
    step: STEP_4,
    title: "Preferred mailing address",
    component: CompanyPreferredMailingAddress,
    event_name: events.FINAL_QUESTION_PREFERRED_MAILING_ADDRESS_CONTINUE
  },
  {
    step: STEP_5,
    title: "Preferred contact information",
    component: CompanyPreferredContactInformation,
    event_name: events.FINAL_QUESTION_PREFERRED_CONTACT_CONTINUE
  }
];
