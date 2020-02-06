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
      return [...state, { flowId: action.payload.flowId, steps: [action.payload.step] }];
    case SET_STEP_IS_ACTIVE:
      console.log("call");
      return state.map(flow => {
        if (flow.flowId === action.payload.flowId) {
          console.log("first");
          return {
            flowId: flow.flowId,
            steps: flow.steps.map(step => {
              if (step.id === action.payload.stepIndex) {
                console.log("second");
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
        { flowId: `${COMPANY_SIGNATORY_ID}${action.index}`, steps: [] },
        { flowId: `${COMPANY_STAKEHOLDER_ID}${action.index}`, steps: [] }
      ];
    case REMOVE_SIGNATORY: {
      const restSteps = state.filter(
        step =>
          !(
            step.flowId.includes(COMPANY_STAKEHOLDER_ID) ||
            step.flowId.includes(COMPANY_SIGNATORY_ID)
          )
      );
      const signatorySteps = state.filter(step => step.flowId.includes(COMPANY_SIGNATORY_ID));
      const stakeholderSteps = state.filter(step => step.flowId.includes(COMPANY_STAKEHOLDER_ID));
      const signatoryStepsBeforeIndex = signatorySteps.filter(
        step => parseInt(step.flowId.match(/\d+/)) < action.index
      );
      const signatoryStepsAfterIndex = signatorySteps
        .filter(step => parseInt(step.flowId.match(/\d+/)) > action.index)
        .map(step => {
          const idx = parseInt(step.flowId.match(/\d+/));
          return { flowId: `${COMPANY_SIGNATORY_ID}${idx - 1}`, steps: [...step.steps] };
        });
      const stakeholderStepsBeforeIndex = stakeholderSteps.filter(
        step => parseInt(step.flowId.match(/\d+/)) < action.index
      );
      const stakeholderStepsAfterIndex = stakeholderSteps
        .filter(step => parseInt(step.flowId.match(/\d+/)) > action.index)
        .map(step => {
          const idx = parseInt(step.flowId.match(/\d+/));
          return { flowId: `${COMPANY_STAKEHOLDER_ID}${idx - 1}`, steps: [...step.steps] };
        });
      return [
        ...restSteps,
        ...signatoryStepsBeforeIndex,
        ...signatoryStepsAfterIndex,
        ...stakeholderStepsBeforeIndex,
        ...stakeholderStepsAfterIndex
      ];
    }
    default:
      return state;
  }
};

export default completedSteps;
