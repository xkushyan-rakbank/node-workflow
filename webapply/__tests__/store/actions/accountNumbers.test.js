import { UPDATE_ACCOUNT_NUMBERS, updateAccountNumbers } from "../../../src/store/actions/accountNumbers";

describe("actions for account numbers", () => {
  it("should create an action to update account numbers", () => {
    const payload = [];
    const expectedAction = { type: UPDATE_ACCOUNT_NUMBERS, payload };
    expect(updateAccountNumbers(payload)).toEqual(expectedAction);
  });
});
