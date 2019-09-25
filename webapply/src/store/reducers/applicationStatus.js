import {
  APPLICATION_STATUS_PROCEED,
  APPLICATION_STATUS_STOP
} from "./../actions/applicationStatus";

const initialState = {
  isProceed: true,
  screeningResults: {}
};

const applicationStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLICATION_STATUS_PROCEED:
      return {
        ...state,
        isProceed: true
      };
    case APPLICATION_STATUS_STOP:
      console.log("action.screeningResults[0]", action.screeningResults[0]);
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
