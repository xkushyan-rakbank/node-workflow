import {
  SEARCH_APPLICATIONS_SUCCESS,
  IS_APPLY_EDIT_APPLICATION,
  SEARCH_APPLICATIONS_FAILURE,
  SEARCH_APPLICATIONS_REQUEST,
  SET_ERROR_OCCURRED_WHILE_PERFORMING,
  GET_PROSPECT_OVERVIEW_SUCCESS
} from "../actions/searchProspect";
import { LOGOUT } from "../actions/loginForm";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  searchResults: [],
  isApplyEditApplication: null,
  isSearchLoading: false,
  errorCode: null,
  prospectOverview: {},
  searchError: false,
  searchErrorDesc: []
};

export default handleActions(
  {
    [SEARCH_APPLICATIONS_REQUEST]: state => ({
      ...state,
      searchResults: initialState.searchResults,
      isSearchLoading: true,
      searchError: initialState.searchError,
      searchErrorDesc: initialState.searchErrorDesc
    }),
    [SEARCH_APPLICATIONS_SUCCESS]: (state, { payload }) => ({
      ...state,
      searchResults: payload || [],
      isSearchLoading: false
    }),
    [SEARCH_APPLICATIONS_FAILURE]: (state, { payload }) => ({
      ...state,
      searchResults: initialState.searchResults,
      isSearchLoading: false,
      searchError: payload.errorType ? true : false,
      searchErrorDesc: payload.errors ? payload.errors : []
    }),
    [IS_APPLY_EDIT_APPLICATION]: (state, { payload }) => ({
      ...state,
      isApplyEditApplication: payload
    }),
    [SET_ERROR_OCCURRED_WHILE_PERFORMING]: (state, { payload }) => ({
      ...state,
      errorCode: payload.errorCode
    }),
    [GET_PROSPECT_OVERVIEW_SUCCESS]: (state, { payload: { prospect } }) => ({
      ...state,
      prospectOverview: prospect
    }),
    [LOGOUT]: () => initialState
  },
  initialState
);
