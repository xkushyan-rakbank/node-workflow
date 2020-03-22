import { groupBy } from "lodash";

import { COMPANY_STAKEHOLDER_ID } from "../../containers/CompanyStakeholders/constants";
import { STEP_STATUS } from "../../constants";

export const getCompletedSteps = state => state.completedSteps || [];

export const getStakeholderSteps = state =>
  getCompletedSteps(state).filter(({ flowId }) => flowId.startsWith(COMPANY_STAKEHOLDER_ID));

export const getIsStakeholderStepsCompleted = state =>
  getStakeholderSteps(state).every(({ status }) => status === STEP_STATUS.COMPLETED);

export const getStakeholdersStepsMap = state => groupBy(getStakeholderSteps(state), "flowId");

export const getIsAnyStakeholderStepsCompleted = state =>
  Object.values(getStakeholdersStepsMap(state)).some(steps =>
    steps.every(step => step === STEP_STATUS.COMPLETED)
  );
