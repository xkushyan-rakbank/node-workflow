import CompanyAnticipatedTransactionsForm from "./CompanySummarySteps/CompanyAnticipatedTransactionsForm";
import CompanyPreferredMailingAddressForm from "./CompanySummarySteps/CompanyPreferredMailingAddressForm";
import CompanyPreferredContactInformationForm from "./CompanySummarySteps/CompanyPreferredContactInformationForm";
import { CompanyBusinessRelationships } from "./CompanySummarySteps/CompanyBusinessRelationships";
import { CompanyBranchesAndSubsidiaries } from "./CompanySummarySteps/CompanyBranchesAndSubsidiaries";

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
    component: CompanyBranchesAndSubsidiaries
  },
  {
    step: STEP_3,
    title: "Anticipated transactions",
    component: CompanyAnticipatedTransactionsForm
  },
  {
    step: STEP_4,
    title: "Preferred mailing address",
    component: CompanyPreferredMailingAddressForm
  },
  {
    step: STEP_5,
    title: "Preferred contact information",
    component: CompanyPreferredContactInformationForm
  }
];
