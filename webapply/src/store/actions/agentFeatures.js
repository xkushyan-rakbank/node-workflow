import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const INVITE_CUSTOMER_FORM = "INVITE_CUSTOMER_FORM";
export const INVITE_CUSTOMER_FORM_SUCCESS = "INVITE_CUSTOMER_FORM_SUCCESS";
export const INVITE_CUSTOMER_FORM_ERROR = "INVITE_CUSTOMER_FORM_ERROR";

export const inviteCustomerFormPromisify = response => ({
  type: INVITE_CUSTOMER_FORM,
  [WAIT_FOR_ACTION]: INVITE_CUSTOMER_FORM_SUCCESS,
  [ERROR_ACTION]: INVITE_CUSTOMER_FORM_ERROR,
  payload: response
});

export const inviteCustomerFormSuccess = response => {
  return { type: INVITE_CUSTOMER_FORM_SUCCESS, payload: response };
};

export const inviteCustomerFormError = error => {
  return { type: INVITE_CUSTOMER_FORM_ERROR, error };
};
