import {
  RETRIEVE_APPLICANT_INFO_SUCCESS,
  RETRIEVE_APPLICANT_INFO_FAIL
} from "../actions/retrieveApplicantInfo";

export const initialState = {
  searchResults: []
};

const retrieveApplicantInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_APPLICANT_INFO_SUCCESS:
      return {
        ...state,
        searchResults: action.payload
      };
    case RETRIEVE_APPLICANT_INFO_FAIL:
      return {
        ...state,
        searchResults: action.payload
      };
    default:
      return state;
  }
};

export default retrieveApplicantInfoReducer;
