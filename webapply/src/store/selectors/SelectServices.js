export const getSelectedTypeCurrency = accountCurrencies => {
  const isSelectedLocalCurrency = accountCurrencies.includes("AED");
  const isSelectForeignCurrencyAndLocal = isSelectedLocalCurrency && accountCurrencies.length > 1;
  const isSelectOnlyForeignCurrency = !isSelectedLocalCurrency && accountCurrencies.length >= 1;

  return {
    isSelectedLocalCurrency,
    isSelectForeignCurrencyAndLocal,
    isSelectOnlyForeignCurrency
  };
};
