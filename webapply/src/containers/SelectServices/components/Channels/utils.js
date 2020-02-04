import { UAE_CODE, SIGNING_TRANSACTIONS_TYPE } from "../../../../constants";

export const checkIsChequeBookApplied = (primaryMobCountryCode, { isSelectedLocalCurrency }) => {
  const isLocalPhoneSelected = primaryMobCountryCode === UAE_CODE;
  return {
    isChequeBookDisabled: true,
    isChequeBookApplied: isSelectedLocalCurrency && isLocalPhoneSelected
  };
};

export const checkIsDebitCardApplied = (accountSigningType, { isSelectedLocalCurrency }) => {
  const isAccountSignType = accountSigningType === SIGNING_TRANSACTIONS_TYPE.ANY;
  return {
    isDebitCardDisabled: true,
    isDebitCardApplied: isAccountSignType && isSelectedLocalCurrency
  };
};
