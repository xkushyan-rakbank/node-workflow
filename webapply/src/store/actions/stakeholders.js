import { appendGaEventToAction } from "./googleAnalytics";
import { GA_EVENTS } from "../../utils/ga";

export const CREATE_NEW_STAKEHOLDER = "CREATE_NEW_STAKEHOLDER";
export const DELETE_STAKEHOLDER = "DELETE_STAKEHOLDER";

export const CHANGE_EDITABLE_STAKEHOLDER = "CHANGE_EDITABLE_STAKEHOLDER";
export const UPDATE_STAKEHOLDERS_IDS = "UPDATE_STAKEHOLDERS_IDS";
export const RESET_STAKEHOLDER_INFO = "RESET_STAKEHOLDER_INFO";

export const createNewStakeholder = () => {
  const action = { type: CREATE_NEW_STAKEHOLDER };
  const gaEvent = GA_EVENTS.COMPANY_STAKEHOLDER_ADD_NEW_CONTINUE;

  return appendGaEventToAction(action, gaEvent);
};

export const deleteStakeholder = stakeholderId => {
  return { type: DELETE_STAKEHOLDER, payload: stakeholderId };
};

export const changeEditableStakeholder = stakeholderId => {
  return { type: CHANGE_EDITABLE_STAKEHOLDER, payload: stakeholderId };
};

export const updateStakeholdersIds = stakeholdersIds => {
  return { type: UPDATE_STAKEHOLDERS_IDS, payload: stakeholdersIds };
};

export const resetStakeholderInfo = stakeholderIndex => {
  return { type: RESET_STAKEHOLDER_INFO, payload: stakeholderIndex };
};
