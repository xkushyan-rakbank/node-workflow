export const ADD_NEW_STAKEHOLDER = "ADD_NEW_STAKEHOLDER";
export const DELETE_STAKEHOLDER = "DELETE_STAKEHOLDER";
export const HANDLE_CITIZENSHIP = "HANDLE_CITIZENSHIP";
export const FORMAT_PERSONAL_INFORMATION = "FORMAT_PERSONAL_INFORMATION";
export const FORMAT_NATIONALITY = "FORMAT_NATIONALITY";

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
