import * as actions from "../actions/selectedAccountInfo";

const initialState = {
  accountType: "",
  islamicBanking: false
};

const selectedAccountInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_ACCOUNT_TYPE:
      return {
        ...state,
        accountType: action.payload
      };
    case actions.UPDATE_ISLAMIC_TYPE:
      return {
        ...state,
        islamicBanking: action.payload
      };
    default:
      return state;
  }
};

export default selectedAccountInfoReducer;
