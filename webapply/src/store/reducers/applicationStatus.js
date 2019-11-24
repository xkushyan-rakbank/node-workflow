import {
  APPLICATION_STATUS_SERVER_ERROR,
  APPLICATION_STATUS_RESET
} from "./../actions/applicationStatus";

export const initialState = {
  isProceed: true,
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
    default:
      return state;
  }
};

export default applicationStatusReducer;
