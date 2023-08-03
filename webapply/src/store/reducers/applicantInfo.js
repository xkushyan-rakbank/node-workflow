import { SET_FROM_INVITATION_LINK } from "../actions/applicantInfoForm";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  isFromInvitationLink: false
};

export default handleActions(
  {
    [SET_FROM_INVITATION_LINK]: state => ({
      isFromInvitationLink: true
    })
  },
  initialState
);
