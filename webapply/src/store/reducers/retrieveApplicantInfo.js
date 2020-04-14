import {
  RETRIEVE_APPLICANT_INFO_SUCCESS,
  GET_PROSPECT_INFO_REQUEST,
  GET_PROSPECT_INFO_SUCCESS
} from "../actions/retrieveApplicantInfo";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  searchResults: [],
  loadingProspectId: ""
};

export default handleActions(
  {
    [GET_PROSPECT_INFO_REQUEST]: (state, { payload }) => ({
      ...state,
      loadingProspectId: payload.prospectId
    }),
    [GET_PROSPECT_INFO_SUCCESS]: state => ({
      ...state,
      loadingProspectId: ""
    }),
    [RETRIEVE_APPLICANT_INFO_SUCCESS]: (state, { payload }) => ({
      ...state,
      searchResults: payload
    })
  },
  initialState
);
