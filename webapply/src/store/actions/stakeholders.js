import { appendGaEventToAction } from "./googleAnalytics";
import { GA_EVENTS } from "../../utils/ga";

export const CREATE_NEW_STAKEHOLDER = "CREATE_NEW_STAKEHOLDER";
export const DELETE_STAKEHOLDER = "DELETE_STAKEHOLDER";

export const CHANGE_EDITABLE_STAKEHOLDER = "CHANGE_EDITABLE_STAKEHOLDER";
export const UPDATE_STAKEHOLDERS_IDS = "UPDATE_STAKEHOLDERS_IDS";
export const SET_EDIT_STAKEHOLDER = "SET_EDIT_STAKEHOLDER";

export const createNewStakeholder = () => {
  const action = { type: CREATE_NEW_STAKEHOLDER };
  const gaEvent = GA_EVENTS.COMPANY_STAKEHOLDER_ADD_NEW_CONTINUE;

  return appendGaEventToAction(action, gaEvent);
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

export const setEditStakeholder = (index, isEditting) => {
  return { type: SET_EDIT_STAKEHOLDER, payload: { index, isEditting } };
};
