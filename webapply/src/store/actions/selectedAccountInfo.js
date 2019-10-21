export const UPDATE_ACCOUNT_TYPE = "UPDATE_ACCOUNT_TYPE";
export const UPDATE_ISLAMIC_TYPE = "UPDATE_ISLAMIC_TYPE";

export const updateAccountType = payload => ({
  type: UPDATE_ACCOUNT_TYPE,
  payload
});

export const updateIslamicType = payload => ({
  type: UPDATE_ISLAMIC_TYPE,
  payload
});
