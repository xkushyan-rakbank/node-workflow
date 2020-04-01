import { getSelectedTypeCurrency } from "../../../src/store/selectors/selectServices";

describe("selectServices selector test", () => {
  it("should get selected type currency with AED", () => {
    expect(getSelectedTypeCurrency(["AED", "EUR"])).toEqual({
      isSelectedLocalCurrency: true,
      isSelectForeignCurrencyAndLocal: true,
      isSelectOnlyForeignCurrency: false
    });
  });

  it("should get selected type currency without AED", () => {
    expect(getSelectedTypeCurrency(["EUR"])).toEqual({
      isSelectedLocalCurrency: false,
      isSelectForeignCurrencyAndLocal: false,
      isSelectOnlyForeignCurrency: true
    });
  });
});
