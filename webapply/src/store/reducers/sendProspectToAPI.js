import {
  SEND_PROSPECT_TO_API,
  SEND_PROSPECT_TO_API_SUCCESS,
  SEND_PROSPECT_TO_API_FAIL,
  SET_SCREENING_RESULTS,
  SET_SCREENING_ERROR,
  RESET_SCREENING_ERROR,
  RESET_FORM_STEP
} from "../actions/sendProspectToAPI";

export const initialState = {
  loading: false,
  resetStep: false,
  errorType: "",
  prospectCopy: {},
  screeningResults: {}
};

const sendProspectToAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_PROSPECT_TO_API:
      return {
        ...state,
        loading: true
      };
    case SEND_PROSPECT_TO_API_SUCCESS:
      return {
        ...state,
        loading: false,
        prospectCopy: action.prospectCopy
      };
    case SEND_PROSPECT_TO_API_FAIL:
      return {
        ...state,
        loading: false
      };
    case RESET_FORM_STEP:
      return {
        ...state,
        resetStep: action.resetStep
      };
    case SET_SCREENING_RESULTS:
      return {
        ...state,
        screeningResults: action.payload
      };
    case SET_SCREENING_ERROR:
      return {
        ...state,
        errorType: action.error
      };
    case RESET_SCREENING_ERROR:
      return {
        ...state,
        errorType: ""
      };
    default:
      return state;
  }
};

export default sendProspectToAPIReducer;
