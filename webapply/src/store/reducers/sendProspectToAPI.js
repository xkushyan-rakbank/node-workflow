import {
  SEND_PROSPECT_TO_API,
  SEND_PROSPECT_TO_API_SUCCESS,
  SEND_PROSPECT_TO_API_FAIL,
  RESET_FORM_STEP
} from "../actions/sendProspectToAPI";

const initialState = {
  loading: false,
  resetStep: false
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
        resetStep: action.resetStep
      };
    default:
      return state;
  }
};

export default sendProspectToAPIReducer;
