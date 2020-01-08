import {
  SET_COMPANY_STEPS,
  SET_SIGNATORY_STEPS,
  ADD_SIGNATORY,
  REMOVE_SIGNATORY
} from "../actions/completedSteps";

export const initialState = {
  finalQuestions: {
    companySteps: [],
    signatorySteps: []
  }
};

const completedSteps = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY_STEPS:
      return {
        ...state,
        finalQuestions: {
          ...state.finalQuestions,
          companySteps: action.steps
        }
      };
    case SET_SIGNATORY_STEPS:
      return {
        ...state,
        finalQuestions: {
          ...state.finalQuestions,
          signatorySteps: state.finalQuestions.signatorySteps.map((signatory, index) => {
            if (index === action.index) {
              return action.steps;
            }
            return signatory;
          })
        }
      };
    case ADD_SIGNATORY:
      return {
        ...state,
        finalQuestions: {
          ...state.finalQuestions,
          signatorySteps: [...state.finalQuestions.signatorySteps, []]
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
        }
      };
    default:
      return state;
  }
};

export default completedSteps;
