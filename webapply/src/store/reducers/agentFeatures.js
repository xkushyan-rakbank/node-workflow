import { INVITE_CUSTOMER_FORM_SUCCESS } from "../actions/agentFeatures";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  inviteStatus: false,
  inviteResponse: {}
};

export default handleActions(
  {
    [INVITE_CUSTOMER_FORM_SUCCESS]: (state, { payload }) => ({
      ...state,
      inviteResponse: payload,
      inviteStatus: true
    })
  },
  initialState
);
