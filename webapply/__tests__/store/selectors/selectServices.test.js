import { getSelectedTypeCurrency } from "../../../src/store/selectors/SelectServices";

describe("selectServices selector test", () => {
  it("should get selected type currency with AED", () => {
    const accountCurrencies = ["AED", "EUR"];
    expect(getSelectedTypeCurrency(accountCurrencies)).toEqual({
      isSelectedLocalCurrency: true,
      isSelectForeignCurrencyAndLocal: true,
      isSelectOnlyForeignCurrency: false
    });
  });
  it("should get selected type currency without AED", () => {
    const accountCurrencies = ["EUR"];
    expect(getSelectedTypeCurrency(accountCurrencies)).toEqual({
      isSelectedLocalCurrency: false,
      isSelectForeignCurrencyAndLocal: false,
      isSelectOnlyForeignCurrency: true
    });
  });
});
