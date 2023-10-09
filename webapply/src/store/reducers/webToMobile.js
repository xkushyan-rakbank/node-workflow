import {
  CLEAR_SESSION,
  SYNC_SESSION_DATA,
  SET_OVERALL_STATUS,
  SESSION_ERR
} from "../actions/webToMobile.js";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  sessionData: {
    sessionType: null,
    webMobileRefId: "",
    status: "",
    SID: "",
    prospectId: ""
  },
  overallStatus: "",
  sessionError: false
};

export default handleActions(
  {
    [SYNC_SESSION_DATA]: (state, action) => ({
      ...state,
      sessionData: action.payload
    }),
    [SET_OVERALL_STATUS]: (state, action) => ({
      ...state,
      overallStatus: action.payload
    }),
    [CLEAR_SESSION]: () => ({
      ...initialState
    }),
    [SESSION_ERR]: (state, action) => ({
      ...state,
      sessionError: action.payload
    })
  },
  initialState
);
