export const ADD_NEW_STAKEHOLDER = "ADD_NEW_STAKEHOLDER";
export const DELETE_STAKEHOLDER = "DELETE_STAKEHOLDER";
export const OPEN_CONFIRM_DIALOG = "OPEN_CONFIRM_DIALOG";
export const CLOSE_CONFIRM_DIALOG = "CLOSE_CONFIRM_DIALOG";
export const CREATE_NEW_STAKEHOLDER = "CREATE_NEW_STAKEHOLDER";
export const CHANGE_EDITABLE_STAKEHOLDER = "CHANGE_EDITABLE_STAKEHOLDER";
export const CONFIRM_HANDLER = "CONFIRM_HANDLER";
export const EDIT_STAKEHOLDER = "EDIT_STAKEHOLDER";
export const FINISH_STAKEHOLDER_EDIT = "FINISH_STAKEHOLDER_EDIT";
export const UPDATE_STAKEHOLDERS_IDS = "UPDATE_STAKEHOLDERS_IDS";

export const addNewStakeholder = () => {
  return { type: ADD_NEW_STAKEHOLDER };
};

export const deleteStakeholder = stakeholderId => {
  return { type: DELETE_STAKEHOLDER, stakeholderId };
};

export const openConfirmDialog = () => {
  return { type: OPEN_CONFIRM_DIALOG };
};

export const closeConfirmDialog = () => {
  return { type: CLOSE_CONFIRM_DIALOG };
};

export const createNewStakeholder = () => {
  return { type: CREATE_NEW_STAKEHOLDER };
};

export const changeEditableStakeholder = editableStakeholder => {
  return { type: CHANGE_EDITABLE_STAKEHOLDER, editableStakeholder };
};

export const confirmHandler = result => {
  return { type: CONFIRM_HANDLER, result };
};

export const editStakeholder = index => {
  return { type: EDIT_STAKEHOLDER, index };
};

export const finishStakeholderEdit = () => {
  return { type: FINISH_STAKEHOLDER_EDIT };
};

export const updateStakeholdersIds = stakeholdersIds => {
  return { type: UPDATE_STAKEHOLDERS_IDS, stakeholdersIds };
};
