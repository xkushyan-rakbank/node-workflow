import { SET_PENDING, SET_VERIFIED, SET_TOKEN, SET_ERROR } from "../actions/reCaptcha";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  isPending: false,
  isVerified: false,
  token: "",
  error: ""
};

export default handleActions(
  {
    [SET_PENDING]: (state, { payload }) => ({
      ...state,
      isPending: payload
    }),
    [SET_VERIFIED]: (state, { payload }) => ({
      ...state,
      isPending: false,
      isVerified: payload
    }),
    [SET_TOKEN]: (state, { payload }) => ({
      ...state,
      token: payload
    }),
    [SET_ERROR]: (state, { payload }) => ({
      ...state,
      isPending: false,
      isVerified: false,
      error: payload
    })
  },
  initialState
);
