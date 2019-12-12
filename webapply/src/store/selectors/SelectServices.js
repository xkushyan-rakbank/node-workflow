import { getInputValueById } from "./input";

export const getSelectedTypeCurrency = (state, id, index) => {
  const accountCurrencies = getInputValueById(state, id, index) || [];

  const isSelectedLocalCurrency = accountCurrencies.includes("AED");
  const isSelectForeignCurrencyAndLocal = isSelectedLocalCurrency && accountCurrencies.length > 1;
  const isSelectOnlyForeignCurrency = !isSelectedLocalCurrency && accountCurrencies.length >= 1;

  return {
    isSelectedLocalCurrency,
    isSelectForeignCurrencyAndLocal,
    isSelectOnlyForeignCurrency
  };
};
