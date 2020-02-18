import { ADD_PLAYED_VIDEO } from "../actions/video";
import { handleActions } from "../../utils/redux-utils";

export default handleActions(
  {
    [ADD_PLAYED_VIDEO]: (state, { payload }) => [...state, payload]
  },
  []
);
