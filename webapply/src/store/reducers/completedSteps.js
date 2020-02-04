import { SET_COMPLETED_STEPS, ADD_SIGNATORY, REMOVE_SIGNATORY } from "../actions/completedSteps";
import { COMPANY_STAKEHOLDER_ID } from "../../containers/CompanyStakeholders/constants";
import { COMPANY_SIGNATORY_ID } from "../../containers/FinalQuestions/components/SignatorySummaryCard/constants";

export const initialState = [];

const completedSteps = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPLETED_STEPS:
      return [...state.filter(item => item.flowId !== action.payload.id), action.payload.steps];
    case ADD_SIGNATORY:
      return [
        ...state,
        { flowId: `${COMPANY_SIGNATORY_ID}${action.index}`, steps: [] },
        { flowId: `${COMPANY_STAKEHOLDER_ID}${action.index}`, steps: [] }
      ];
    case REMOVE_SIGNATORY: {
      const restSteps = state.filter(
        item =>
          item.flowId.includes(COMPANY_STAKEHOLDER_ID) || item.flowId.includes(COMPANY_SIGNATORY_ID)
      );
      const signatorySteps = state.filter(item => item.flowId.includes(COMPANY_SIGNATORY_ID));
      const stakeholderSteps = state.filter(item => item.flowId.includes(COMPANY_STAKEHOLDER_ID));
      const signatoryStepsBeforeIndex = signatorySteps.filter(
        item => parseInt(item.flowId.match(/\d+/)) < action.index
      );
      const signatoryStepsAfterIndex = signatorySteps
        .filter(item => parseInt(item.flowId.match(/\d+/)) > action.index)
        .map(item => {
          const idx = parseInt(item.flowId.match(/\d+/));
          return { flowId: `${COMPANY_SIGNATORY_ID}${idx - 1}`, steps: [...item.steps] };
        });
      const stakeholderStepsBeforeIndex = stakeholderSteps.filter(
        item => parseInt(item.flowId.match(/\d+/)) < action.index
      );
      const stakeholderStepsAfterIndex = stakeholderSteps
        .filter(item => parseInt(item.flowId.match(/\d+/)) > action.index)
        .map(item => {
          const idx = parseInt(item.flowId.match(/\d+/));
          return { flowId: `${COMPANY_STAKEHOLDER_ID}${idx - 1}`, steps: [...item.steps] };
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
