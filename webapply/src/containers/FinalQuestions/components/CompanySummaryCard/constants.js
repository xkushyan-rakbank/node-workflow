import CompanyAnticipatedTransactionsForm from "../../../../components/FinalQuestions/CompanyAnticipatedTransactionsForm";
import CompanyPreferredMailingAddressForm from "../../../../components/FinalQuestions/CompanyPreferredMailingAddressForm";
import CompanyPreferredContactInformationForm from "../../../../components/FinalQuestions/CompanyPreferredContactInformationForm";
import CompanyBusinessRelationshipsForm from "../../../../components/FinalQuestions/CompanyBusinessRelationshipsForm";
import CompanyBranchesAndSubsidiariesForm from "../../../../components/FinalQuestions/CompanyBranchesAndSubsidiariesForm";

export const INITIAL_COMPANY_STEP = 1;
export const INITIAL_SIGNATORY_STEP = 0;

export const finalQuestionsSteps = [
  {
    step: 1,
    title: "Business relationships",
    component: CompanyBusinessRelationshipsForm
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
