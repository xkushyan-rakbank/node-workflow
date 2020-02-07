import { SEARCH_APPLICATIONS_SUCCESS, IS_APPLY_EDIT_APPLICATION } from "../actions/searchProspect";
import { LOGOUT } from "../actions/loginForm";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  searchResults: [],
  isApplyEditApplication: false
};

export default handleActions(
  {
    [SEARCH_APPLICATIONS_SUCCESS]: (state, { payload }) => ({
      ...state,
      searchResults: payload
    }),
    [IS_APPLY_EDIT_APPLICATION]: state => ({
      ...state,
      isApplyEditApplication: true
    }),
    [LOGOUT]: () => initialState
  },
  initialState
);
