import { UPDATE_ACCOUNT_TYPE, UPDATE_ISLAMIC_TYPE } from "../actions/selectedAccountInfo";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  accountType: "",
  islamicBanking: false
};

export default handleActions(
  {
    [UPDATE_ACCOUNT_TYPE]: (state, { payload: accountType }) => ({
      ...state,
      accountType
    }),
    [UPDATE_ISLAMIC_TYPE]: (state, { payload: islamicBanking }) => ({
      ...state,
      islamicBanking
    })
  },
  initialState
);
