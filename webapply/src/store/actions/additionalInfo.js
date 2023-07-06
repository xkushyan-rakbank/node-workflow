// Action types
export const UPDATE_COMPANY_ADDITIONAL_INFO_STATUS = "UPDATE_COMPANY_ADDITIONAL_INFO_STATUS";
export const UPDATE_STAKEHOLDER_INFO_STATUS = "UPDATE_STAKEHOLDER_INFO_STATUS";

export const updateCompanyAdditionalInfoStatus = status => ({
  type: UPDATE_COMPANY_ADDITIONAL_INFO_STATUS,
  payload: status
});

export const updateStakeholderInfoStatus = status => ({
  type: UPDATE_STAKEHOLDER_INFO_STATUS,
  payload: status
});
