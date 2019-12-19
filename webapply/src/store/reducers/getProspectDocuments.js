import { UPLOAD_FILES_PROGRESS } from "../actions/getProspectDocuments";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  progress: {}
};

export default handleActions(
  {
    [UPLOAD_FILES_PROGRESS]: (state, { progress }) => ({
      ...state,
      progress: { ...state.progress, ...progress }
    })
  },
  initialState
);
