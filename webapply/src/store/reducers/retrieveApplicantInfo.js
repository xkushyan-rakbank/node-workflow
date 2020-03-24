import { RETRIEVE_APPLICANT_INFO_SUCCESS } from "../actions/retrieveApplicantInfo";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  searchResults: []
};

export default handleActions(
  {
    [RETRIEVE_APPLICANT_INFO_SUCCESS]: (state, action) => ({
      ...state,
      searchResults: action.payload
    })
  },
  initialState
);
