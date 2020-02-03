import {
  UAE_CODE,
  SIGNING_TRANSACTIONS_TYPE,
  AUTHORITY_TYPE_SOLE_PROPRIETOR_ID
} from "../../../../constants";

export const checkIsChequeBookApplied = (primaryMobCountryCode, { isSelectedLocalCurrency }) => {
  const isLocalPhoneSelected = primaryMobCountryCode === UAE_CODE;
  return {
    isChequeBookDisabled: true,
    isChequeBookApplied: isSelectedLocalCurrency && isLocalPhoneSelected
  };
};

export const checkIsDebitCardApplied = (
  accountSigningType,
  { isSelectedLocalCurrency },
  authorityType
) => {
  const isAccountSignType = accountSigningType === SIGNING_TRANSACTIONS_TYPE.ANY;
  return {
    isDebitCardDisabled: true,
    isDebitCardApplied:
      authorityType === AUTHORITY_TYPE_SOLE_PROPRIETOR_ID ||
      (isAccountSignType && isSelectedLocalCurrency)
  };
};
