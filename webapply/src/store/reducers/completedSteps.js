import { SET_COMPLETED_STEPS, ADD_SIGNATORY, REMOVE_SIGNATORY } from "../actions/completedSteps";
import { COMPANY_STAKEHOLDER_ID } from "../../containers/CompanyStakeholders/constants";
import { COMPANY_SIGNATORY_ID } from "../../containers/FinalQuestions/components/SignatorySummaryCard/constants";

export const initialState = [];

const completedSteps = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPLETED_STEPS:
      return [...state.filter(step => step.flowId !== action.payload.id), action.payload.steps];
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
