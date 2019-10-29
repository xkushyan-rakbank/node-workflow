import * as actions from "../actions/validationErrors";

const initialState = [{}];

const validationErrorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_VALIDATION_ERRORS:
      return [...action.payload];
    default:
      return state;
  }
};

export default validationErrorsReducer;
