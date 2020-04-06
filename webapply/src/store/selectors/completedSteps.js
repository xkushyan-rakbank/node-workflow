import { COMPANY_STAKEHOLDER_ID } from "../../containers/CompanyStakeholders/constants";
import { COMPANY_SIGNATORY_ID, FINAL_QUESTIONS_COMPANY_ID, STEP_STATUS } from "../../constants";

export const getCompletedSteps = state => state.completedSteps || [];

export const getCompanySteps = state =>
  getCompletedSteps(state).filter(({ flowId }) => flowId === FINAL_QUESTIONS_COMPANY_ID);

export const getSignatoriesSteps = state =>
  getCompletedSteps(state).filter(({ flowId }) => flowId.includes(COMPANY_SIGNATORY_ID));

export const getStakeholderSteps = state =>
  getCompletedSteps(state).filter(({ flowId }) => flowId.startsWith(COMPANY_STAKEHOLDER_ID));

export const getIsStakeholderStepsCompleted = state =>
  getStakeholderSteps(state).every(({ status }) => status === STEP_STATUS.COMPLETED);

export const getIsAnyStakeholderStepsCompleted = state =>
  !Object.values(
    getStakeholderSteps(state).reduce(
      (acc, { flowId, status }) => ({
        ...acc,
        [flowId]: acc[flowId] || status !== STEP_STATUS.COMPLETED
      }),
      {}
    )
  ).some(Boolean);
