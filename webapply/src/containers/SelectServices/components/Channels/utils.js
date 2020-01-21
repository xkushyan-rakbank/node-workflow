import { UAE_CODE, SIGNING_TRANSACTIONS_TYPE_ANY } from "../../../../constants";

export const checkIsChequeBookApplied = (
  primaryMobCountryCode,
  { isSelectOnlyForeignCurrency }
) => {
  const isLocalPhoneSelected = primaryMobCountryCode === UAE_CODE;
  return {
    isChequeBookDisabled: true,
    isChequeBookApplied: !isSelectOnlyForeignCurrency && isLocalPhoneSelected
  };
};

export const checkIsDebitCardApplied = (accountSigningType, { isSelectedLocalCurrency }) => {
  const isAccountSignType = accountSigningType === SIGNING_TRANSACTIONS_TYPE_ANY;
  const isDebitCardDisabled = !isSelectedLocalCurrency || !isAccountSignType;
  const isDebitCardApplied = isAccountSignType && isSelectedLocalCurrency;
  return {
    isDebitCardDisabled,
    isDebitCardApplied
  };
};
