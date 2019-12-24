import {
  OPEN_WEB_CHAT,
  CLOSE_WEB_CHAT,
  MINIMIZE_WEB_CHAT,
  EXPAND_WEB_CHAT
} from "../actions/webChat";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  opened: false,
  closed: true,
  minimized: false,
  expanded: false
};

export default handleActions(
  {
    [OPEN_WEB_CHAT]: state => ({
      ...state,
      opened: true,
      closed: false,
      minimized: false
    }),
    [CLOSE_WEB_CHAT]: state => ({
      ...state,
      opened: false,
      closed: true
    }),
    [MINIMIZE_WEB_CHAT]: state => ({
      ...state,
      opened: true,
      minimized: true,
      closed: false,
      expanded: false
    }),
    [EXPAND_WEB_CHAT]: state => ({
      ...state,
      expanded: true,
      minimized: false
    })
  },
  initialState
);
