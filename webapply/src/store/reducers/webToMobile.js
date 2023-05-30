import { CLEAR_SESSION, SYNC_SESSION_DATA } from "../actions/webToMobile.js";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  sessionData: {
    sessionType: null,
    webMobileRefId: "",
    status: "",
    SID: "",
    prospectId: ""
  }
};

export default handleActions(
  {
    [SYNC_SESSION_DATA]: (state, action) => ({
      ...state,
      sessionData: action.payload
    }),
    [CLEAR_SESSION]: () => ({
      ...initialState
    })
  },
  initialState
);
