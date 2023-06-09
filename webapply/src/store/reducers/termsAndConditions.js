import { TERMS_ACCEPTED } from "../actions/termsAndConditions.js";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  termsAndConditions: {
    kfs: false,
    authorisation: false,
    generalTCs: false
  }
};

export default handleActions(
  {
    [TERMS_ACCEPTED]: (state, { payload }) => ({
      ...state,
      termsAndConditions: {
        ...state.termsAndConditions,
        ...payload
      }
    })
  },
  initialState
);
