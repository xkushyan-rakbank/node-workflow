import { TERMS_ACCEPTED, TERMS_LOADING } from "../actions/termsAndConditions.js";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  termsAndConditions: {
    kfs: false,
    authorisation: false,
    generalTCs: false
  },
  isLoadingPdf: false
};

export default handleActions(
  {
    [TERMS_ACCEPTED]: (state, { payload }) => ({
      ...state,
      termsAndConditions: {
        ...state.termsAndConditions,
        ...payload
      }
    }),
    [TERMS_LOADING]: (state, { payload }) => ({
      ...state,
      isLoadingPdf: payload.isLoadingPdf
    })
  },
  initialState
);
