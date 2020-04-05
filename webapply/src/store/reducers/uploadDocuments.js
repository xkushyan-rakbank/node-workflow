import {
  UPLOAD_FILES_PROGRESS,
  UPLOAD_FILES_FAIL,
  DOC_UPLOADER,
  GET_PROSPECT_DOCUMENTS_SUCCESS,
  RETRIEVE_DOC_UPLOADER,
  GET_PROSPECT_DOCUMENTS_FAIL,
  SAVE_AND_RETRIEVE_DOC_UPLOADER
} from "../actions/uploadDocuments";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  progress: {},
  uploadErrors: {},
  isLoading: true
};

export default handleActions(
  {
    [DOC_UPLOADER]: (state, { payload }) => ({
      ...state,
      uploadErrors: { ...state.uploadErrors, [payload.documentKey]: null }
    }),
    [UPLOAD_FILES_PROGRESS]: (state, { progress }) => ({
      ...state,
      progress: { ...state.progress, ...progress }
    }),
    [UPLOAD_FILES_FAIL]: (state, { error }) => ({
      ...state,
      uploadErrors: { ...state.uploadErrors, ...error }
    }),
    [SAVE_AND_RETRIEVE_DOC_UPLOADER]: state => ({
      ...state,
      isLoading: true
    }),
    [RETRIEVE_DOC_UPLOADER]: state => ({
      ...state,
      isLoading: true
    }),
    [GET_PROSPECT_DOCUMENTS_SUCCESS]: state => ({
      ...state,
      isLoading: false
    }),
    [GET_PROSPECT_DOCUMENTS_FAIL]: state => ({
      ...state,
      isLoading: true
    })
  },
  initialState
);
