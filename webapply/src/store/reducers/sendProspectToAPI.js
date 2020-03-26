import {
  SEND_PROSPECT_TO_API,
  SEND_PROSPECT_TO_API_SUCCESS,
  SEND_PROSPECT_TO_API_FAIL,
  SET_SCREENING_ERROR,
  RESET_SCREENING_ERROR,
  RESET_FORM_STEP
} from "../actions/sendProspectToAPI";

export const initialState = {
  loading: false,
  resetStep: false,
  screeningError: {}
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
        loading: false
      };
    case SEND_PROSPECT_TO_API_FAIL:
      return {
        ...state,
        loading: false
      };
    case RESET_FORM_STEP:
      return {
        ...state,
        resetStep: action.payload
      };
    case SET_SCREENING_ERROR:
      return {
        ...state,
        screeningError: action.payload
      };
    case RESET_SCREENING_ERROR:
      return {
        ...state,
        screeningError: initialState.screeningError
      };
    default:
      return state;
  }
};

export default sendProspectToAPIReducer;
