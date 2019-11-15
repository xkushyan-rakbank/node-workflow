export const ADD_NEW_STAKEHOLDER = "ADD_NEW_STAKEHOLDER";
export const DELETE_STAKEHOLDER = "DELETE_STAKEHOLDER";
export const HANDLE_CITIZENSHIP = "HANDLE_CITIZENSHIP";
export const FORMAT_PERSONAL_INFORMATION = "FORMAT_PERSONAL_INFORMATION";
export const FORMAT_NATIONALITY = "FORMAT_NATIONALITY";
export const OPEN_CONFIRM_DIALOG = "OPEN_CONFIRM_DIALOG";
export const CLOSE_CONFIRM_DIALOG = "CLOSE_CONFIRM_DIALOG";
export const CREATE_NEW_STAKEHOLDER = "CREATE_NEW_STAKEHOLDER";
export const CHANGE_EDITABLE_STAKEHOLDER = "CHANGE_EDITABLE_STAKEHOLDER";
export const CONFIRM_HANDLER = "CONFIRM_HANDLER";
export const EDIT_STAKEHOLDER = "EDIT_STAKEHOLDER";
export const HANDLE_CHANGE_STEP = "HANDLE_CHANGE_STEP";
export const CHANGE_STEP = "CHANGE_STEP";
export const FINISH_STAKEHOLDER_EDIT = "FINISH_STAKEHOLDER_EDIT";
export const UPDATE_STAKEHOLDERS_IDS = "UPDATE_STAKEHOLDERS_IDS";

export const addNewStakeholder = () => {
  return { type: ADD_NEW_STAKEHOLDER };
};

export const deleteStakeholder = stakeholderId => {
  return { type: DELETE_STAKEHOLDER, stakeholderId };
};

export const handleCitizenship = (index, value, passportIndex) => {
  return { type: HANDLE_CITIZENSHIP, index, value, passportIndex };
};

export const formatPersonalInformation = index => {
  return { type: FORMAT_PERSONAL_INFORMATION, index };
};

export const formatNationality = index => {
  return { type: FORMAT_NATIONALITY, index };
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

export const handleChangeStep = step => {
  return { type: HANDLE_CHANGE_STEP, step };
};

export const changeStep = step => {
  return { type: CHANGE_STEP, step };
};

export const finishStakeholderEdit = () => {
  return { type: FINISH_STAKEHOLDER_EDIT };
};

export const updateStakeholdersIds = stakeholdersIds => {
  return { type: UPDATE_STAKEHOLDERS_IDS, stakeholdersIds };
};
