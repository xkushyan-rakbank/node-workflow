import {
  SEARCH_APPLICATIONS_SUCCESS,
  IS_APPLY_EDIT_APPLICATION,
  SEARCH_APPLICATIONS_FAILURE,
  SEARCH_APPLICATIONS
} from "../actions/searchProspect";
import { LOGOUT } from "../actions/loginForm";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  searchResults: [],
  isApplyEditApplication: null,
  searchResultsError: null
};

export default handleActions(
  {
    [SEARCH_APPLICATIONS]: state => ({
      ...state,
      searchResultsError: null
    }),
    [SEARCH_APPLICATIONS_SUCCESS]: (state, { payload }) => ({
      ...state,
      searchResults: payload
    }),
    [SEARCH_APPLICATIONS_FAILURE]: (state, { payload }) => ({
      ...state,
      searchResultsError: payload
    }),
    [IS_APPLY_EDIT_APPLICATION]: (state, { payload }) => ({
      ...state,
      isApplyEditApplication: payload
    }),
    [LOGOUT]: () => initialState
  },
  initialState
);
