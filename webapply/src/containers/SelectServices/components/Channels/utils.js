import { UAE_CODE, SIGNING_TRANSACTIONS_TYPE_ANY } from "../../../../constants";

export const checkIsChequeBookApplied = (primaryMobCountryCode, selectedTypeCurrency) => {
  const isLocalPhoneSelected = primaryMobCountryCode === UAE_CODE;
  const { isSelectOnlyForeignCurrency } = selectedTypeCurrency;
  return {
    isChequeBookDisabled: true,
    isChequeBookApplied: !isSelectOnlyForeignCurrency && isLocalPhoneSelected
  };
};

export const checkIsDebitCardApplied = (accountSigningType, selectedTypeCurrency) => {
  const isAccountSignType = accountSigningType === SIGNING_TRANSACTIONS_TYPE_ANY;
  const { isSelectedLocalCurrency } = selectedTypeCurrency;
  const isDebitCardDisabled = !isSelectedLocalCurrency || !isAccountSignType;
  const isDebitCardApplied = isAccountSignType && isSelectedLocalCurrency;
  return {
    isDebitCardDisabled,
    isDebitCardApplied
  };
};
