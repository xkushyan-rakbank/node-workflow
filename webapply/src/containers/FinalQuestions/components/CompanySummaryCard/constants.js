import { CompanyAnticipatedTransactions } from "./CompanySummarySteps/CompanyAnticipatedTransactions";
import { CompanyPreferredMailingAddress } from "./CompanySummarySteps/CompanyPreferredMailingAddress";
import { CompanyPreferredContactInformation } from "./CompanySummarySteps/CompanyPreferredContactInformation";
import { CompanyBusinessRelationships } from "./CompanySummarySteps/CompanyBusinessRelationships";
import { CompanyBusinessRelationshipsComponent } from "./CompanySummarySteps/CompanyBranchesAndSubsidiaries";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;
export const STEP_4 = 4;
export const STEP_5 = 5;

export const finalQuestionsSteps = [
  {
    step: STEP_1,
    title: "Business relationships",
    component: CompanyBusinessRelationships
  },
  {
    step: STEP_2,
    title: "Branches and subsidiaries",
    component: CompanyBusinessRelationshipsComponent
  },
  {
    step: STEP_3,
    title: "Anticipated transactions",
    component: CompanyAnticipatedTransactions
  },
  {
    step: STEP_4,
    title: "Preferred mailing address",
    component: CompanyPreferredMailingAddress
  },
  {
    step: STEP_5,
    title: "Preferred contact information",
    component: CompanyPreferredContactInformation
  }
];
