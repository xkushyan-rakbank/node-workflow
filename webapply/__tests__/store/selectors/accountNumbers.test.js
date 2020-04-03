import { getAccountNumbers } from "../../../src/store/selectors/accountNumbers";

describe("accountNumbers selector test", () => {
  const accountNumbers = "some account numbers";
  const state = { accountNumbers };

  it("should return accountNumbers", () => {
    expect(getAccountNumbers(state)).toBe(accountNumbers);
  });
});
