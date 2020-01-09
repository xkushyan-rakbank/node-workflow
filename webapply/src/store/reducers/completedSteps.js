import {
  SET_COMPANY_STEPS_COMPLETE,
  SET_SIGNATORY_STEPS_COMPLETE,
  ADD_SIGNATORY,
  REMOVE_SIGNATORY
} from "../actions/completedSteps";

export const initialState = {
  finalQuestions: {
    companySteps: false,
    signatorySteps: []
  }
};

const completedSteps = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY_STEPS_COMPLETE:
      return {
        ...state,
        finalQuestions: {
          ...state.finalQuestions,
          companySteps: action.value
        }
      };
    case SET_SIGNATORY_STEPS_COMPLETE:
      return {
        ...state,
        finalQuestions: {
          ...state.finalQuestions,
          signatorySteps: state.finalQuestions.signatorySteps.map((signatory, index) => {
            if (index === action.payload.index) {
              return action.payload.value;
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
          signatorySteps: [...state.finalQuestions.signatorySteps, false]
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
