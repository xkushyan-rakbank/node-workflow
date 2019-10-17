export const ADD_NEW_STAKEHOLDER = "ADD_NEW_STAKEHOLDER";
export const DELETE_STAKEHOLDER = "DELETE_STAKEHOLDER";
export const SET_DUAL_CITIZENSHIP = "SET_DUAL_CITIZENSHIP";
export const DELETE_DUAL_CITIZENSHIP = "DELETE_DUAL_CITIZENSHIP";

export const addNewStakeholder = () => {
  return { type: ADD_NEW_STAKEHOLDER };
};

export const deleteStakeholder = stakeholderId => {
  return { type: DELETE_STAKEHOLDER, stakeholderId };
};

export const setDualCitizenship = (index, citizenship) => {
  return { type: SET_DUAL_CITIZENSHIP, index, citizenship };
};
export const deleteDualCitizenship = citizenship => {
  return { type: DELETE_DUAL_CITIZENSHIP, citizenship };
};
