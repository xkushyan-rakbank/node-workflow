import { UPDATE_ACCOUNT_NUMBERS, updateAccountNumbers } from "../accountNumbers";

describe("actions for account numbers", () => {
  const payload = [];
  const expectedAction = { type: UPDATE_ACCOUNT_NUMBERS, payload };
  it("should create an action to update account numbers", () => {
    expect(updateAccountNumbers(payload)).toEqual(expectedAction);
  });
});
