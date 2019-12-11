import { CHANGE_EDITABLE_STAKEHOLDER, UPDATE_STAKEHOLDERS_IDS } from "../actions/stakeholders";

export const initialState = {
  isNewStakeholder: false,
  editableStakeholder: undefined,
  isStatusShown: false,
  stakeholdersIds: []
};

const stakeholders = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EDITABLE_STAKEHOLDER:
      return {
        ...state,
        editableStakeholder: action.editableStakeholder
      };
    case UPDATE_STAKEHOLDERS_IDS:
      return {
        ...state,
        stakeholdersIds: action.stakeholdersIds
      };
    default:
      return state;
  }
};

export default stakeholders;
