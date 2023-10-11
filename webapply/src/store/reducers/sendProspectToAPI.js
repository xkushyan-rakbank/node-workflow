import {
  SEND_PROSPECT_TO_API,
  SEND_PROSPECT_TO_API_SUCCESS,
  SEND_PROSPECT_TO_API_FAIL,
  SET_SCREENING_ERROR,
  RESET_SCREENING_ERROR,
  RESET_FORM_STEP,
  SEND_PROSPECT_TO_API_AUTO_SAVE_SUCCESS
} from "../actions/sendProspectToAPI";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  loading: false,
  resetStep: false,
  screeningError: {}
};

export default handleActions(
  {
    [SEND_PROSPECT_TO_API]: state => ({
      ...state,
      loading: true
    }),
    [SEND_PROSPECT_TO_API_SUCCESS]: state => ({
      ...state,
      loading: false
    }),
    [SEND_PROSPECT_TO_API_AUTO_SAVE_SUCCESS]: state => ({
      ...state,
      loading: false
    }),
    [SEND_PROSPECT_TO_API_FAIL]: state => ({
      ...state,
      loading: false
    }),
    [RESET_FORM_STEP]: (state, action) => ({
      ...state,
      resetStep: action.payload
    }),
    [SET_SCREENING_ERROR]: (state, action) => ({
      ...state,
      screeningError: action.payload
    }),
    [RESET_SCREENING_ERROR]: state => ({
      ...state,
      screeningError: initialState.screeningError
    })
  },
  initialState
);
