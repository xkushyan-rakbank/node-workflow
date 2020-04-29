import { createSelector } from "reselect";
import { getAccountCurrencies } from "./appConfig";

export const getSelectedTypeCurrency = createSelector(
  getAccountCurrencies,
  accountCurrencies => {
    const isSelectedLocalCurrency = accountCurrencies.includes("AED");
    const isSelectForeignCurrencyAndLocal = isSelectedLocalCurrency && accountCurrencies.length > 1;
    const isSelectOnlyForeignCurrency = !isSelectedLocalCurrency && accountCurrencies.length >= 1;

    return {
      isSelectedLocalCurrency,
      isSelectForeignCurrencyAndLocal,
      isSelectOnlyForeignCurrency
    };
  }
);
