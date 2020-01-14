import { UAE_CODE } from "../../../../constants";

export const checkIsChequeBookApplied = (
  primaryMobCountryCode,
  primaryPhoneCountryCode,
  isLocalCurrencySelected
) => {
  const isLocalPhoneSelected = [primaryMobCountryCode, primaryPhoneCountryCode].includes(UAE_CODE);

  return {
    isChequeBookDisabled: isLocalCurrencySelected === isLocalPhoneSelected,
    isChequeBookApplied: isLocalCurrencySelected && isLocalPhoneSelected
  };
};
