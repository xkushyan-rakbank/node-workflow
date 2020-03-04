import {
  SEARCH_APPLICATIONS_SUCCESS,
  IS_APPLY_EDIT_APPLICATION,
  SEARCH_APPLICATIONS_FAILURE,
  SEARCH_APPLICATIONS_REQUEST,
  IS_LOCK_STATUS_BY_RO_AGENT,
  SET_CIF_ALREADY_EXIST_ERROR
} from "../actions/searchProspect";
import { LOGOUT } from "../actions/loginForm";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  searchResults: [],
  isApplyEditApplication: null,
  isSearchLoading: false,
  isLockStatusByROAgent: false,
  isCIFAlreadyExist: false
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
    [IS_LOCK_STATUS_BY_RO_AGENT]: (state, { payload }) => ({
      ...state,
      isLockStatusByROAgent: payload
    }),
    [SET_CIF_ALREADY_EXIST_ERROR]: (state, { payload }) => ({
      ...state,
      isCIFAlreadyExist: payload
    }),
    [LOGOUT]: () => initialState
  },
  initialState
);
