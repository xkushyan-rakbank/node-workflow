import get from "lodash/get";
import { REHYDRATE } from "redux-persist";

import {
  RECEIVE_APPCONFIG,
  RECEIVE_APPCONFIG_SUCCESS,
  RECEIVE_APPCONFIG_FAIL,
  UPDATE_PROSPECT_ID,
  SET_CONFIG,
  SET_PROSPECT,
  SAVE_PROSPECT_MODEL
} from "../actions/appConfig";
import { LOGIN_INFO_FORM_SUCCESS } from "../actions/loginForm";

export const initialState = {
  loading: false,
  uiConfig: {},
  endpoints: {},
  prospect: {
    applicationInfo: {
      islamicBanking: false
    }
  },
  dataList: {},
  error: "",
  prospectError: false,
  searchInfo: { segment: "sme" },
  login: {},
  prospectModel: {}
};

const appConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        prospect: get(action, "payload.appConfig.prospect", state.prospect)
      };
    }
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
    case LOGIN_INFO_FORM_SUCCESS:
      return {
        ...state,
        authorizationToken: get(action, "payload.access_token", state.authorizationToken)
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
    case SET_PROSPECT:
      return {
        ...state,
        prospect: action.prospect
      };
    case UPDATE_PROSPECT_ID:
      return {
        ...state,
        prospect: {
          ...state.prospect,
          generalInfo: {
            ...get(state, "prospect.generalInfo", {}),
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
