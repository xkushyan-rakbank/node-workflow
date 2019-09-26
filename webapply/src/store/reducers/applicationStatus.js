import {
  APPLICATION_STATUS_PROCEED,
  APPLICATION_STATUS_STOP,
  APPLICATION_STATUS_SERVER_ERROR
} from "./../actions/applicationStatus";

const initialState = {
  isProceed: true,
  serverErorr: false,
  screeningResults: {}
};

const applicationStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLICATION_STATUS_PROCEED:
      return {
        ...state,
        isProceed: true
      };
    case APPLICATION_STATUS_SERVER_ERROR:
      return {
        ...state,
        serverErorr: true,
        isProceed: false
      };
    case APPLICATION_STATUS_STOP:
      return {
        ...state,
        isProceed: false,
        screeningResults: action.screeningResults[0] // tmp - clarify in Dhanya why array !!!!
      };
    default:
      return state;
  }
};

export default applicationStatusReducer;
