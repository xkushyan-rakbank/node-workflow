import {
  SET_STEP_STATUS,
  SET_INITIAL_STEPS,
  ADD_SIGNATORY,
  REMOVE_SIGNATORY
} from "../actions/completedSteps";
import { COMPANY_STAKEHOLDER_ID } from "../../containers/CompanyStakeholders/constants";
import { COMPANY_SIGNATORY_ID } from "../../containers/FinalQuestions/components/SignatorySummaryCard/constants";

export const initialState = [];

const completedSteps = (state = initialState, action) => {
  switch (action.type) {
    case SET_STEP_STATUS:
      return state.map(step => {
        if (step.flowId === action.payload.flowId) {
          if (step.step === action.payload.step) {
            return { ...step, ...action.payload.status };
          }
          return step.isActive ? { ...step, isActive: false } : step;
        }
        return step;
      });
    case SET_INITIAL_STEPS:
      return [...state, ...action.payload.steps];
    case ADD_SIGNATORY:
      return [
        ...state,
        { flowId: `${COMPANY_SIGNATORY_ID}${action.signatoryId}`, steps: [] },
        { flowId: `${COMPANY_STAKEHOLDER_ID}${action.signatoryId}`, steps: [] }
      ];
    case REMOVE_SIGNATORY:
      return state.filter(flow => !flow.flowId.includes(action.signatoryId));
    default:
      return state;
  }
};

export default completedSteps;
