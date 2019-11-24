import { SEARCH_APPLICATIONS_SUCCESS } from "../actions/searchProspect";
import { LOGOUT } from "../actions/loginForm";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  searchResults: []
};

export default handleActions(
  {
    [SEARCH_APPLICATIONS_SUCCESS]: (state, { payload }) => ({
      ...state,
      searchResults: payload
    }),
    [LOGOUT]: () => initialState
  },
  initialState
);
