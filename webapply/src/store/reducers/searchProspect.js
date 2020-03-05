import {
  SEARCH_APPLICATIONS_SUCCESS,
  IS_APPLY_EDIT_APPLICATION,
  SEARCH_APPLICATIONS_FAILURE,
  SEARCH_APPLICATIONS_REQUEST,
  SET_ERROR_OCCURRED_WHILE_PERFORMING
} from "../actions/searchProspect";
import { LOGOUT } from "../actions/loginForm";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  searchResults: [],
  isApplyEditApplication: null,
  isSearchLoading: false,
  errorCode: null
};

export default handleActions(
  {
    [SEARCH_APPLICATIONS_REQUEST]: state => ({
      ...state,
      searchResults: initialState.searchResults,
      isSearchLoading: true
    }),
    [SEARCH_APPLICATIONS_SUCCESS]: (state, { payload }) => ({
      ...state,
      searchResults: payload || [],
      isSearchLoading: false
    }),
    [SEARCH_APPLICATIONS_FAILURE]: state => ({
      ...state,
      searchResults: initialState.searchResults,
      isSearchLoading: false
    }),
    [IS_APPLY_EDIT_APPLICATION]: (state, { payload }) => ({
      ...state,
      isApplyEditApplication: payload
    }),
    [SET_ERROR_OCCURRED_WHILE_PERFORMING]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [LOGOUT]: () => initialState
  },
  initialState
);
