import {
  UPLOAD_FILES_PROGRESS,
  UPLOAD_FILES_FAIL,
  UPLOAD_FILES_SUCCESS
} from "../actions/getProspectDocuments";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  progress: {},
  uploadErrors: {}
};

export default handleActions(
  {
    [UPLOAD_FILES_PROGRESS]: (state, { progress }) => ({
      ...state,
      progress: { ...state.progress, ...progress }
    }),
    [UPLOAD_FILES_FAIL]: (state, error) => ({
      ...state,
      uploadErrors: { ...state.uploadErrors, ...error }
    }),
    [UPLOAD_FILES_SUCCESS]: (state, { payload }) => ({
      ...state,
      uploadErrors: { ...state.uploadErrors, ...payload }
    })
  },
  initialState
);
