import {
  RECEIVE_APPCONFIG,
  RECEIVE_APPCONFIG_SUCCESS,
  RECEIVE_APPCONFIG_FAIL,
  UPDATE_FIELD,
  UPDATE_PROSPECT
} from "../actions/appConfig";

const initialState = {
  loading: false,
  uiConfig: {},
  endpoints: {},
  prospect: {},
  error: ""
};

const appConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_APPCONFIG:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case RECEIVE_APPCONFIG_SUCCESS:
      return {
        ...state,
        ...action.data,
        loading: false
      };
    case RECEIVE_APPCONFIG_FAIL:
      return {
        ...state,
        loading: false,
        error: "error"
      };
    case UPDATE_FIELD:
      return {
        ...state
      };
    case UPDATE_PROSPECT:
      return {
        ...state,
        prospect: action.prospect
      };
    default:
      return state;
  }
};

export default appConfigReducer;
