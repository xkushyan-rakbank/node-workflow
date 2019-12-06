import {
  APPLICATION_STATUS_SERVER_ERROR,
  APPLICATION_STATUS_RESET,
  APPLICATION_STATUS_SCREENING_RESULTS
} from "./../actions/applicationStatus";

export const initialState = {
  serverErorr: false,
  screeningResults: {},
  uiError: false
};

const applicationStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLICATION_STATUS_SERVER_ERROR:
      return {
        ...state,
        serverErorr: true
      };
    case APPLICATION_STATUS_RESET:
      return initialState;
    case APPLICATION_STATUS_SCREENING_RESULTS:
      return {
        ...state,
        screeningResults: action.payload
      };
    default:
      return state;
  }
};

export default applicationStatusReducer;
