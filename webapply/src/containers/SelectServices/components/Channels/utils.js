import { UAE_CODE } from "../../../../constants";
import {
  ACCOUNTS_SIGNING_NAME_ALL_OF_US,
  ACCOUNTS_SIGNING_NAME_ANY_OF_US,
  ACCOUNTS_SIGNING_NAME_OTHER
} from "../../constants";

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

export const checkIsDebitCardApplied = (
  accountSigningType,
  authorityType,
  isLocalCurrencySelected
) => {
  const authorityTypeSP = "Sole proprietor";

  const isAccountSigningTypeAllOfUs = accountSigningType === ACCOUNTS_SIGNING_NAME_ALL_OF_US;
  const isAccountSigningTypeAnyOfUs = accountSigningType === ACCOUNTS_SIGNING_NAME_ANY_OF_US;
  const isAccountSigningTypeOther = accountSigningType === ACCOUNTS_SIGNING_NAME_OTHER;
  const isAuthorityTypeSP = authorityType === authorityTypeSP;

  if (isLocalCurrencySelected || isAccountSigningTypeAnyOfUs || isAuthorityTypeSP) {
    return { isDebitCardDisabled: true, isDebitCardApplied: true };
  }

  if (!isLocalCurrencySelected || isAccountSigningTypeAllOfUs || isAccountSigningTypeOther) {
    return { isDebitCardDisabled: true, isDebitCardApplied: false };
  }

  return { isDebitCardDisabled: false, isDebitCardApplied: false };
};
