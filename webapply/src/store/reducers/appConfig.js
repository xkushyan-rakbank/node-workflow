import {
  RECEIVE_APPCONFIG,
  RECEIVE_APPCONFIG_SUCCESS,
  RECEIVE_APPCONFIG_FAIL,
  UPDATE_PROSPECT_ID,
  SET_PROSPECT
} from "../actions/appConfig";

const initialState = {
  loading: false,
  uiConfig: {},
  endpoints: {},
  prospect: {},
  error: "",
  searchInfo: {},
  login: {}
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
    case SET_PROSPECT:
      return {
        ...state,
        prospect: action.prospect,
        searchInfo: action.prospect.searchInfo,
        login: action.prospect.login
      };
    case UPDATE_PROSPECT_ID:
      return {
        ...state,
        prospect: {
          ...state.prospect,
          generalInfo: {
            ...(state.prospect.generalInfo || {}),
            prospectId: action.prospectId
          }
        }
      };
    default:
      return state;
  }
};

export default appConfigReducer;
