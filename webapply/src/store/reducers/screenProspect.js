import {
  SCREEN_PROSPECT_REQUEST,
  SCREEN_PROSPECT_SUCCESS,
  SCREEN_PROSPECT_RESET
} from "../actions/screenProspect";
import { REQUEST_LOADING, REQUEST_SUCCESS } from "../../constants";
import { handleActions } from "../../utils/redux-utils";

export default handleActions(
  {
    [SCREEN_PROSPECT_REQUEST]: (state, action) => ({
      ...state,
      [action.payload.prospectId]: {
        status: REQUEST_LOADING
      }
    }),
    [SCREEN_PROSPECT_SUCCESS]: (state, action) => ({
      ...state,
      [action.payload.prospectId]: {
        status: REQUEST_SUCCESS,
        data: action.payload
      }
    }),
    [SCREEN_PROSPECT_RESET]: (state, action) => {
      const { [action.payload.prospectId]: omitted, ...rest } = state;

      return rest;
    }
  },
  {}
);
