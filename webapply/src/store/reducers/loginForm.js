import { LOGIN_INFO_FORM_SUCCESS, LOGOUT, RESET_LOGIN_INFO } from "../actions/loginForm";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  loginStatus: false,
  loginResponse: {}
};

export default handleActions(
  {
    [LOGIN_INFO_FORM_SUCCESS]: (state, { payload }) => ({
      ...state,
      loginResponse: payload,
      loginStatus: true
    }),
    [RESET_LOGIN_INFO]: state => ({
      ...state,
      loginStatus: false
    }),
    [LOGOUT]: () => initialState
  },
  initialState
);
