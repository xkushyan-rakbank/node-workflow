import { SEARCH_APPLICATIONS_SUCCESS } from "../actions/searchProspect";
import { LOGOUT } from "../actions/loginForm";

export const initialState = {
  searchResults: []
};

const searchProspectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_APPLICATIONS_SUCCESS:
      return {
        ...state,
        searchResults: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        searchResults: []
      };
    default:
      return state;
  }
};

export default searchProspectReducer;
