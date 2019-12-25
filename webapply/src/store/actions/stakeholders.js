export const CREATE_NEW_STAKEHOLDER = "CREATE_NEW_STAKEHOLDER";
export const DELETE_STAKEHOLDER = "DELETE_STAKEHOLDER";

export const CHANGE_EDITABLE_STAKEHOLDER = "CHANGE_EDITABLE_STAKEHOLDER";
export const UPDATE_STAKEHOLDERS_IDS = "UPDATE_STAKEHOLDERS_IDS";
export const SET_FILL_STAKEHOLDER = "SET_FILL_STAKEHOLDER";

export const createNewStakeholder = () => {
  return { type: CREATE_NEW_STAKEHOLDER };
};

export const deleteStakeholder = stakeholderId => {
  return { type: DELETE_STAKEHOLDER, stakeholderId };
};

export const changeEditableStakeholder = editableStakeholder => {
  return { type: CHANGE_EDITABLE_STAKEHOLDER, editableStakeholder };
};

export const updateStakeholdersIds = stakeholdersIds => {
  return { type: UPDATE_STAKEHOLDERS_IDS, stakeholdersIds };
};

export const setFillStakeholder = (index, done) => {
  return { type: SET_FILL_STAKEHOLDER, payload: { index, done } };
};
