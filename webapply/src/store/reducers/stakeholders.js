import { CHANGE_EDITABLE_STAKEHOLDER, UPDATE_STAKEHOLDERS_IDS } from "../actions/stakeholders";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  editableStakeholder: undefined,
  isStatusShown: false,
  stakeholdersIds: []
};

export default handleActions(
  {
    [CHANGE_EDITABLE_STAKEHOLDER]: (state, action) => ({
      ...state,
      editableStakeholder: action.editableStakeholder
    }),
    [UPDATE_STAKEHOLDERS_IDS]: (state, action) => ({
      ...state,
      stakeholdersIds: action.stakeholdersIds
    })
  },
  initialState
);
