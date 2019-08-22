import {
  RECEIVE_UICONFIG,
  RECEIVE_UICONFIG_SUCCESS,
  RECEIVE_UICONFIG_FAIL
} from "../actions/uiConfig";

const initialState = {};

const uiConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_UICONFIG:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case RECEIVE_UICONFIG_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case RECEIVE_UICONFIG_FAIL:
      return {
        ...state,
        loading: false,
        error: "error"
      };
    default:
      return state;
  }
};

export default uiConfigReducer;
