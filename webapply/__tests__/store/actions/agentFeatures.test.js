import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

import {
  INVITE_CUSTOMER_FORM,
  INVITE_CUSTOMER_FORM_SUCCESS,
  INVITE_CUSTOMER_FORM_ERROR,
  inviteCustomerFormPromisify,
  inviteCustomerFormSuccess,
  inviteCustomerFormError
} from "../../../src/store/actions/agentFeatures";

describe("applicantInfoForm actions", () => {
  it("should create an action to invite customer form promisify", () => {
    const payload = {};
    const expectedAction = {
      type: INVITE_CUSTOMER_FORM,
      [WAIT_FOR_ACTION]: INVITE_CUSTOMER_FORM_SUCCESS,
      [ERROR_ACTION]: INVITE_CUSTOMER_FORM_ERROR,
      payload
    };
    expect(inviteCustomerFormPromisify(payload)).toEqual(expectedAction);
  });

  it("should create an action to invite customer form success", () => {
    const payload = {};
    const expectedAction = {
      type: INVITE_CUSTOMER_FORM_SUCCESS,
      payload
    };
    expect(inviteCustomerFormSuccess(payload)).toEqual(expectedAction);
  });

  it("should create an action to invite customer form error", () => {
    const error = {};
    const expectedAction = {
      type: INVITE_CUSTOMER_FORM_ERROR,
      error
    };
    expect(inviteCustomerFormError(error)).toEqual(expectedAction);
  });
});
