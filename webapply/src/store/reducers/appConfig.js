import get from "lodash/get";
import { REHYDRATE } from "redux-persist";
import { handleActions } from "../../utils/redux-utils";

import {
  RECEIVE_APPCONFIG,
  RECEIVE_APPCONFIG_SUCCESS,
  RECEIVE_APPCONFIG_FAIL,
  UPDATE_PROSPECT_ID,
  UPDATE_VALID_RO_CODE,
  REMOVE_PROSPECT_ID,
  SET_CONFIG,
  SET_PROSPECT,
  SAVE_SIGNATORY_MODEL,
  SAVE_ORGANIZATION_INFO_MODEL,
  SET_ACCESS_TOKEN,
  RESET_PROSPECT,
  RESET_APPLICANT_INFO,
  SET_PROSPECT_LEAD,
  SET_EXPIRED,
  SET_RO_CODE,
  INITIAL_CHECK,
  KYC_INITIAL_EDIT_CHECK,
  UPDATE_RO_EMAIL,
  SET_TAT
} from "../actions/appConfig";
import { LOGIN_INFO_FORM_SUCCESS, LOGOUT } from "../actions/loginForm";
import { UAE_CODE } from "../../constants";
import { DECISIONS_LOADING } from "../actions/decisions";
import appConfig from "../../config/appConfig.json";

export const initialState = {
  loading: false,
  decisionLoading: {},
  uiConfig: {},
  prospect: {
    applicationInfo: {
      islamicBanking: false
    }
  },
  iskycInitialEdit: false,
  initialProspectTableCheck: {
    poaCountry: false,
    riskIndustries: false,
    clientDealingCountry: false,
    goAmlIndustry: false
  },
  dataList: {},
  roEmail: "",
  error: "",
  prospectError: false,
  searchInfo: { segment: "sme" },
  login: {},
  signatoryModel: {}
};

export default handleActions(
  {
    [REHYDRATE]: (state, action) => ({
      ...state,
      prospect: get(action, "payload.appConfig.prospect", state.prospect)
    }),
    [RECEIVE_APPCONFIG]: state => ({
      ...state,
      loading: true,
      error: ""
    }),
    [RECEIVE_APPCONFIG_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }),
    [LOGIN_INFO_FORM_SUCCESS]: (state, action) => ({
      ...state,
      authorizationToken: get(action, "payload.access_token", state.authorizationToken)
    }),
    [SET_ACCESS_TOKEN]: (state, action) => ({
      ...state,
      authorizationToken: action.payload
    }),
    [RECEIVE_APPCONFIG_FAIL]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload || "error"
    }),
    [SET_CONFIG]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [SET_PROSPECT]: (state, action) => ({
      ...state,
      prospect: action.payload
    }),
    [RESET_PROSPECT]: state => ({
      ...state,
      prospect: appConfig.prospect
    }),
    [UPDATE_PROSPECT_ID]: (state, action) => ({
      ...state,
      prospect: {
        ...state.prospect,
        generalInfo: {
          ...get(state, "prospect.generalInfo", {}),
          prospectId: action.payload
        }
      }
    }),
    [UPDATE_VALID_RO_CODE]: (state, action) => ({
      ...state,
      prospect: {
        ...state.prospect,
        applicantInfo: {
          ...get(state, "prospect.applicantInfo", {}),
          validRoCode: action.payload
        }
      }
    }),
    [REMOVE_PROSPECT_ID]: state => ({
      ...state,
      prospect: {
        ...state.prospect,
        generalInfo: {
          ...get(state, "prospect.generalInfo", {}),
          prospectId: ""
        }
      }
    }),
    [SAVE_SIGNATORY_MODEL]: (state, action) => ({
      ...state,
      signatoryModel: action.payload
    }),
    [SAVE_ORGANIZATION_INFO_MODEL]: (state, action) => ({
      ...state,
      organizationInfoModel: action.payload
    }),
    [INITIAL_CHECK]: (state, action) => ({
      ...state,
      initialProspectTableCheck: { ...state.initialProspectTableCheck, ...action.payload }
    }),
    [KYC_INITIAL_EDIT_CHECK]: (state, action) => ({
      ...state,
      iskycInitialEdit: action.payload
    }),
    [LOGOUT]: state => ({
      ...state,
      login: {
        userName: "",
        password: ""
      },
      searchInfo: {
        ...state.searchInfo,
        fullName: "",
        countryCode: UAE_CODE,
        mobileNo: "",
        leadNumber: "",
        tradeLicenseNo: "",
        email: ""
      },
      prospect: {}
    }),
    [RESET_APPLICANT_INFO]: state => ({
      ...state,
      authorizationToken: null,
      prospect: {
        ...state.prospect,
        applicantInfo: {
          fullName: "",
          email: "",
          countryCode: UAE_CODE,
          mobileNo: "",
          applyOnbehalf: false
        }
      }
    }),
    [SET_PROSPECT_LEAD]: (state, action) => ({
      ...state,
      leadSource: action.payload
    }),
    [SET_EXPIRED]: (state, action) => ({
      ...state,
      expired: action.payload
    }),
    [SET_RO_CODE]: (state, action) => ({
      ...state,
      roCode: action.payload
    }),
    [UPDATE_RO_EMAIL]: (state, action) => ({
      ...state,
      roEmail: action.payload
    }),
    [DECISIONS_LOADING]: (state, action) => ({
      ...state,
      decisionLoading: action.payload
    }),
    [SET_TAT]: (state, action) => ({
      ...state,
      tat: action.payload
    })
  },
  initialState
);
