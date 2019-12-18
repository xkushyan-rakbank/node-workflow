import { UPLOAD_FILES_PROGRESS } from "../actions/getProspectDocuments";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  propgress: 0
};

export default handleActions(
  {
    [UPLOAD_FILES_PROGRESS]: (state, action) => ({
      propgress: action.progress
    })
  },
  initialState
);
