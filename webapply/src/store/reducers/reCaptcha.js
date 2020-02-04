import { SET_TOKEN, SET_ERROR } from "../actions/reCaptcha";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  token: "",
  error: ""
};

export default handleActions(
  {
    [SET_TOKEN]: (state, { payload }) => ({
      ...state,
      token: payload
    }),
    [SET_ERROR]: (state, { payload }) => ({
      ...state,
      error: payload
    })
  },
  initialState
);
