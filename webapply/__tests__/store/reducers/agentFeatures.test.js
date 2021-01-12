import reducer from "../../../src/store/reducers/agentFeatures";
import { inviteCustomerFormSuccess } from "../../../src/store/actions/agentFeatures";

describe("loginForm reducer test", () => {
  it("should handle LOGIN_INFO_FORM_SUCCESS action type", () => {
    const response = "some data";
    expect(reducer(undefined, inviteCustomerFormSuccess(response))).toMatchObject({
      inviteResponse: response,
      inviteStatus: true
    });
  });
});
