import {
  ADD_NEW_STAKEHOLDER,
  OPEN_CONFIRM_DIALOG,
  CLOSE_CONFIRM_DIALOG,
  CHANGE_EDITABLE_STAKEHOLDER,
  CHANGE_STEP,
  FINISH_STAKEHOLDER_EDIT
} from "../actions/stakeholders";

export const initialState = {
  isNewStakeholder: false,
  isConfirmDialogOpen: false,
  editableStakeholder: undefined,
  isFinalScreenShown: false,
  step: 1,
  confirmation: false,
  isStatusShown: false,
  completedStep: 0
};

const stakeholders = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_STAKEHOLDER:
      return {
        ...state,
        isNewStakeholder: true,
        step: initialState.step
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
        isConfirmDialogOpen: false,
        step: initialState.step
      };
    case CHANGE_STEP:
      return {
        ...state,
        ...action.step
      };
    case FINISH_STAKEHOLDER_EDIT:
      return {
        ...state,
        isFinalScreenShown: false,
        editableStakeholder: undefined
      };
    default:
      return state;
  }
};

export default stakeholders;
