import { UPDATE_ACCOUNT_NUMBERS } from "../actions/accountNumbers";
import { handleActions } from "../../utils/redux-utils";

export const initialState = [];

export default handleActions(
  {
    [UPDATE_ACCOUNT_NUMBERS]: (state, action) => [...action.payload]
  },
  initialState
);
