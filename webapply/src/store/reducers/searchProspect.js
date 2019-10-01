import { SEARCH_APPLICATIONS_SUCCESS, SEARCH_APPLICATIONS_FAIL } from "../actions/searchProspect";

const initialState = {
  searchResults: [],
  currentProspect: ""
};

const searchProspectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_APPLICATIONS_SUCCESS:
      return {
        ...state,
        searchResults: action.payload
      };
    case SEARCH_APPLICATIONS_FAIL:
      return {
        ...state,
        searchResults: action.payload
      };
    default:
      return state;
  }
};

export default searchProspectReducer;
