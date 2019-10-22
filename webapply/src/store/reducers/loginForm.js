import * as actions from "../actions/loginForm";

export const initialState = {
  loginStatus: false,
  loginResponse: {}
};

const loginFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_INFO_FORM_SUCCESS:
      return {
        ...state,
        loginResponse: action.payload,
        loginStatus: true
      };
    case actions.LOGIN_INFO_FORM_FAIL:
      return {
        ...state,
        loginResponse: action.payload,
        loginStatus: false
      };
    case actions.LOGOUT:
      return {
        ...state,
        loginStatus: false
      };
    default:
      return state;
  }
};

export default loginFormReducer;
