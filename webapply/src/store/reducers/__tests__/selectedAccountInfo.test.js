import { initialState } from "../selectedAccountInfo";
import selectedAccountInfoReducer from "../selectedAccountInfo";

import { updateAccountType, updateIslamicType } from "../../actions/selectedAccountInfo";

describe("applicationStatus reducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise initialState as the value", () => {
      const { accountType, islamicBanking } = initialState;

      expect(accountType).toEqual("");
      expect(islamicBanking).toBe(false);
    });
  });

  describe("selectedAccountInfoReducer", () => {
    const mockAccountType = "retail";
    const mockIsIslamic = true;
    it("updateAccountType should update accountType", () => {
      const state = selectedAccountInfoReducer(initialState, updateAccountType(mockAccountType));
      const { accountType } = state;
      expect(accountType).toBe(mockAccountType);
    });

    it("updateIslamicType should update islamicBanking", () => {
      const state = selectedAccountInfoReducer(initialState, updateIslamicType(mockIsIslamic));
      const { islamicBanking } = state;
      expect(islamicBanking).toBe(mockIsIslamic);
    });
  });
});
