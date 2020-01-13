import { UAE_CODE } from "../../../../constants";

export const checkIsChequeBookApplied = (
  primaryMobCountryCode,
  primaryPhoneCountryCode,
  isLocalCurrencySelected
) => {
  const isLocalPhoneSelected = [primaryMobCountryCode, primaryPhoneCountryCode].includes(UAE_CODE);

  if (isLocalCurrencySelected && isLocalPhoneSelected) {
    return { isChequeBookDisabled: true, isChequeBookApplied: true };
  }

  if (!isLocalCurrencySelected && !isLocalPhoneSelected) {
    return { isChequeBookDisabled: true, isChequeBookApplied: false };
  }

  return { isChequeBookDisabled: false, isChequeBookApplied: false };
};
