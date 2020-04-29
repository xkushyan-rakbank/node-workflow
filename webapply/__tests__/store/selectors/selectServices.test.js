import { getSelectedTypeCurrency } from "../../../src/store/selectors/selectServices";
import { getAccountCurrencies } from "../../../src/store/selectors/appConfig";

jest.mock("../../../src/store/selectors/appConfig");

describe("selectServices selector test", () => {
  it("should get selected type currency with AED", () => {
    getAccountCurrencies.mockReturnValue(["AED", "EUR"]);
    expect(getSelectedTypeCurrency({})).toEqual({
      isSelectedLocalCurrency: true,
      isSelectForeignCurrencyAndLocal: true,
      isSelectOnlyForeignCurrency: false
    });
  });

  it("should get selected type currency without AED", () => {
    getAccountCurrencies.mockReturnValue(["EUR"]);
    expect(getSelectedTypeCurrency({})).toEqual({
      isSelectedLocalCurrency: false,
      isSelectForeignCurrencyAndLocal: false,
      isSelectOnlyForeignCurrency: true
    });
  });
});
