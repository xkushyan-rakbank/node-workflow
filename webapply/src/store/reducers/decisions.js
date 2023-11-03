import { handleActions } from "../../utils/redux-utils";
import { DECISIONS_LOADING } from "../actions/decisions.js";

export const initialState = {
  decisionLoading: {}
};

export default handleActions(
  {
    [DECISIONS_LOADING]: (state, action) => ({
      ...state,
      decisionLoading: action.payload
    })
  },
  initialState
);
