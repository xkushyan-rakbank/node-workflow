import {
  UPLOAD_FILES_PROGRESS,
  UPLOAD_FILES_FAIL,
  DOC_UPLOADER,
  GET_PROSPECT_DOCUMENTS_SUCCESS,
  RETRIEVE_DOC_UPLOADER,
  GET_PROSPECT_DOCUMENTS_FAIL,
  SAVE_AND_RETRIEVE_DOC_UPLOADER,
  SAVE_DOCUMENT_UPLOAD_AUTH_TOKEN,
  SAVE_DOCUMENT_LIST,
  DOCUMENTS_UPLOAD_COMPLETED
} from "../actions/uploadDocuments";
import { handleActions, composeActions } from "../../utils/redux-utils";

export const initialState = {
  progress: {},
  uploadErrors: {},
  isLoading: true,
  authToken: null,
  documentList: [],
  documentUploadCompleted: false
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
    [composeActions(SAVE_AND_RETRIEVE_DOC_UPLOADER, RETRIEVE_DOC_UPLOADER)]: state => ({
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
    }),
    [SAVE_DOCUMENT_UPLOAD_AUTH_TOKEN]: (state, { payload }) => ({
      ...state,
      authToken: payload
    }),
    [SAVE_DOCUMENT_LIST]: (state, { payload }) => ({
      ...state,
      documentList: payload
    }),
    [DOCUMENTS_UPLOAD_COMPLETED]: (state, { payload }) => ({
      ...state,
      documentUploadCompleted: payload
    })
  },
  initialState
);
