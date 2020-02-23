import {
  UPLOAD_FILES_PROGRESS,
  UPLOAD_FILES_FAIL,
  DOC_UPLOADER,
  GET_PROSPECT_DOCUMENTS_SUCCESS
} from "../actions/getProspectDocuments";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  progress: {},
  uploadErrors: {},
  isLoading: true
};

export default handleActions(
  {
    [DOC_UPLOADER]: (state, { docProps: documentKey }) => ({
      ...state,
      uploadErrors: { ...state.uploadErrors, [documentKey]: null }
    }),
    [UPLOAD_FILES_PROGRESS]: (state, { progress }) => ({
      ...state,
      progress: { ...state.progress, ...progress }
    }),
    [UPLOAD_FILES_FAIL]: (state, error) => ({
      ...state,
      uploadErrors: { ...state.uploadErrors, ...error }
    }),
    [GET_PROSPECT_DOCUMENTS_SUCCESS]: state => ({
      ...state,
      isLoading: false
    })
  },
  initialState
);
