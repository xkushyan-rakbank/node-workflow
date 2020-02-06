import {
  SET_STEP,
  SET_STEP_IS_ACTIVE,
  SET_INITIAL_STEP,
  ADD_STEP,
  ADD_SIGNATORY,
  REMOVE_SIGNATORY
} from "../actions/completedSteps";
import { COMPANY_STAKEHOLDER_ID } from "../../containers/CompanyStakeholders/constants";
import { COMPANY_SIGNATORY_ID } from "../../containers/FinalQuestions/components/SignatorySummaryCard/constants";

export const initialState = [];

const completedSteps = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STEP:
      return state.map(flow => {
        if (flow.flowId === action.payload.flowId) {
          return { flowId: action.payload.flowId, steps: [...flow.steps, action.payload.step] };
        }
        return flow;
      });
    case SET_STEP:
      return state.map(flow => {
        if (flow.flowId === action.payload.flowId) {
          return {
            flowId: action.payload.flowId,
            steps: flow.steps.map(step => {
              if (step.id === action.payload.stepIndex) {
                return action.payload.step;
              }
              return step;
            })
          };
        }
        return flow;
      });
    case SET_INITIAL_STEP:
      return state.some(flow => flow.flowId === action.payload.flowId)
        ? state.map(flow => {
            if (flow.flowId === action.payload.flowId) {
              return {
                flowId: action.payload.flowId,
                steps: [action.payload.step]
              };
            }
            return flow;
          })
        : [...state, { flowId: action.payload.flowId, steps: [action.payload.step] }];
    case SET_STEP_IS_ACTIVE:
      return state.map(flow => {
        if (flow.flowId === action.payload.flowId) {
          return {
            flowId: flow.flowId,
            steps: flow.steps.map(step => {
              if (step.id === action.payload.stepIndex) {
                return { ...step, isActive: true };
              }
              return { ...step, isActive: false };
            })
          };
        }
        return flow;
      });
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
