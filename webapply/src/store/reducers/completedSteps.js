import { SET_COMPLETED_STEPS, ADD_SIGNATORY, REMOVE_SIGNATORY } from "../actions/completedSteps";

export const initialState = [];

const completedSteps = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPLETED_STEPS:
      return [...state.filter(item => item.id !== action.payload.steps.id), action.payload.steps];
    case ADD_SIGNATORY:
      return {
        ...state,
        finalQuestions: {
          ...state.finalQuestions,
          signatorySteps: [...state.finalQuestions.signatorySteps, []]
        },
        companyStakeholders: {
          ...state.companyStakeholders,
          stakeholdersSteps: [...state.companyStakeholders.stakeholdersSteps, []]
        }
      };
    case REMOVE_SIGNATORY:
      return {
        ...state,
        finalQuestions: {
          ...state.finalQuestions,
          signatorySteps: state.finalQuestions.signatorySteps.filter(
            (signatory, index) => index !== action.index
          )
        },
        companyStakeholders: {
          ...state.companyStakeholders,
          stakeholdersSteps: state.companyStakeholders.stakeholdersSteps.filter(
            (signatory, index) => index !== action.index
          )
        }
      };
    default:
      return state;
  }
};

export default completedSteps;
