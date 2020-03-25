import reducer, { initialState } from "../../../src/store/reducers/accountNumbers";
import { updateAccountNumbers } from "../../../src/store/actions/accountNumbers";

describe("acount numbers reducers", () => {
  it("should create a reducer to update account numbers", () => {
    const payload = [];
    expect(reducer(initialState, updateAccountNumbers(payload))).toStrictEqual(payload);
  });
});
