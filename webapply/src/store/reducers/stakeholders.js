import { CHANGE_EDITABLE_STAKEHOLDER, UPDATE_STAKEHOLDERS_IDS } from "../actions/stakeholders";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  editableStakeholder: null,
  stakeholdersIds: []
};

export default handleActions(
  {
    [CHANGE_EDITABLE_STAKEHOLDER]: (state, { payload }) => ({
      ...state,
      editableStakeholder: payload
    }),
    [UPDATE_STAKEHOLDERS_IDS]: (state, { payload }) => ({
      ...state,
      stakeholdersIds: payload
    })
  },
  initialState
);
