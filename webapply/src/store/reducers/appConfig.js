import {
  RECEIVE_APPCONFIG,
  RECEIVE_APPCONFIG_SUCCESS,
  RECEIVE_APPCONFIG_FAIL,
  UPDATE_PROSPECT_ID,
  SET_CONFIG,
  SET_PROSPECT_SUCCESS,
  SET_PROSPECT_REQUEST,
  SET_PROSPECT_FAIL,
  SAVE_PROSPECT_MODEL
} from "../actions/appConfig";

export const initialState = {
  loading: false,
  uiConfig: {},
  endpoints: {},
  prospect: {},
  error: "",
  prospectError: false,
  searchInfo: { segment: "sme" },
  login: {},
  prospectModel: {}
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
    case SET_CONFIG:
      return {
        ...state,
        ...action.payload
      };
    case SET_PROSPECT_REQUEST:
      return {
        ...state,
        loading: true,
        prospectError: false
      };
    case SET_PROSPECT_SUCCESS:
      return {
        ...state,
        loading: false,
        prospectError: false,
        prospect: {
          ...state.prospect,
          ...action.prospect
        }
      };
    case SET_PROSPECT_FAIL:
      return {
        ...state,
        loading: false,
        prospectError: true
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
    case SAVE_PROSPECT_MODEL:
      return {
        ...state,
        prospectModel: action.prospectModel
      };
    default:
      return state;
  }
};

export default appConfigReducer;
