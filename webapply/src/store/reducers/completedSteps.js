import { SET_COMPLETED_STEPS, ADD_SIGNATORY, REMOVE_SIGNATORY } from "../actions/completedSteps";

export const initialState = {
  selectServices: {
    selectServicesSteps: []
  },
  companyStakeholders: {
    stakeholdersSteps: []
  },
  companyInfo: {
    companySteps: []
  },
  finalQuestions: {
    companySteps: [],
    signatorySteps: []
  }
};

const completedSteps = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPLETED_STEPS:
      return {
        ...state,
        [action.payload.path]: action.payload.steps
      };
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
