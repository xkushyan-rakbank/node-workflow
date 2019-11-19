import CompanyAnticipatedTransactionsForm from "./CompanySummarySteps/CompanyAnticipatedTransactionsForm";
import CompanyPreferredMailingAddressForm from "./CompanySummarySteps/CompanyPreferredMailingAddressForm";
import CompanyPreferredContactInformationForm from "./CompanySummarySteps/CompanyPreferredContactInformationForm";
import { CompanyBusinessRelationships } from "./CompanySummarySteps/CompanyBusinessRelationships";
import CompanyBranchesAndSubsidiariesForm from "./CompanySummarySteps/CompanyBranchesAndSubsidiariesForm";

export const INITIAL_COMPANY_STEP = 1;
export const INITIAL_SIGNATORY_STEP = 0;

export const finalQuestionsSteps = [
  {
    step: 1,
    title: "Business relationships",
    component: CompanyBusinessRelationships
  },
  {
    step: 2,
    title: "Branches and subsidiaries",
    component: CompanyBranchesAndSubsidiariesForm
  },
  {
    step: 3,
    title: "Anticipated transactions",
    component: CompanyAnticipatedTransactionsForm
  },
  {
    step: 4,
    title: "Preferred mailing address",
    component: CompanyPreferredMailingAddressForm
  },
  {
    step: 5,
    title: "Preferred contact information",
    component: CompanyPreferredContactInformationForm
  }
];
