import { SEARCH_APPLICATIONS_SUCCESS } from "../actions/searchProspect";

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
    default:
      return state;
  }
};

export default searchProspectReducer;
