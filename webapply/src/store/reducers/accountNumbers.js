import { UPDATE_ACCOUNT_NUMBERS } from "../actions/accountNumbers";

export const initialState = [];

const accountNumbers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT_NUMBERS:
      return [...action.payload];
    default:
      return state;
  }
};

export default accountNumbers;
