import { UAE_CODE, SIGNING_TRANSACTIONS_TYPE_ANY } from "../../../../constants";

export const checkIsChequeBookApplied = (primaryMobCountryCode, isLocalCurrencySelected) => {
  const isLocalPhoneSelected = primaryMobCountryCode === UAE_CODE;
  return {
    isChequeBookDisabled: !isLocalCurrencySelected || !isLocalPhoneSelected,
    isChequeBookApplied: isLocalCurrencySelected && isLocalPhoneSelected
  };
};

export const checkIsDebitCardApplied = (accountSigningType, isLocalCurrencySelected) => {
  const isAccountSignType = accountSigningType === SIGNING_TRANSACTIONS_TYPE_ANY;
  const isDebitCardDisabled = !isLocalCurrencySelected || !isAccountSignType;
  const isDebitCardApplied = isAccountSignType && isLocalCurrencySelected;
  return {
    isDebitCardDisabled,
    isDebitCardApplied
  };
};
