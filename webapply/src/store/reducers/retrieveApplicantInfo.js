import {
  RETRIEVE_APPLICANT_INFO_SUCCESS,
  GET_PROSPECT_INFO_REQUEST,
  GET_PROSPECT_INFO_SUCCESS
} from "../actions/retrieveApplicantInfo";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  searchResults: [],
  loadingProspectId: null,
  isComeback: false
};

export default handleActions(
  {
    [GET_PROSPECT_INFO_REQUEST]: (state, { payload }) => ({
      ...state,
      loadingProspectId: payload.prospectId
    }),
    [GET_PROSPECT_INFO_SUCCESS]: state => ({
      ...state,
      loadingProspectId: null,
      isComeback: true
    }),
    [RETRIEVE_APPLICANT_INFO_SUCCESS]: (state, { payload }) => ({
      ...state,
      searchResults: payload
    })
  },
  initialState
);
