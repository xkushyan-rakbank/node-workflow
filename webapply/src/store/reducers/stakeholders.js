import {
  ADD_NEW_STAKEHOLDER,
  OPEN_CONFIRM_DIALOG,
  CLOSE_CONFIRM_DIALOG,
  CHANGE_EDITABLE_STAKEHOLDER,
  FINISH_STAKEHOLDER_EDIT,
  EDIT_STAKEHOLDER,
  UPDATE_STAKEHOLDERS_IDS
} from "../actions/stakeholders";

export const initialState = {
  isNewStakeholder: false,
  isConfirmDialogOpen: false,
  editableStakeholder: undefined,
  isFinalScreenShown: false,
  confirmation: false,
  isStatusShown: false,
  completedStep: 0,
  stakeholdersIds: []
};

const stakeholders = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_STAKEHOLDER:
      return {
        ...state,
        isNewStakeholder: true,
        completedStep: initialState.completedStep,
        isFinalScreenShown: false
      };
    case OPEN_CONFIRM_DIALOG:
      return {
        ...state,
        isConfirmDialogOpen: true
      };
    case CLOSE_CONFIRM_DIALOG:
      return {
        ...state,
        isConfirmDialogOpen: false
      };
    case CHANGE_EDITABLE_STAKEHOLDER:
      return {
        ...state,
        editableStakeholder: action.editableStakeholder,
        isConfirmDialogOpen: false
      };
    case FINISH_STAKEHOLDER_EDIT:
      return {
        ...state,
        isFinalScreenShown: false,
        editableStakeholder: undefined
      };
    case EDIT_STAKEHOLDER:
      return {
        ...state,
        isNewStakeholder: false
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
