import { UAE_CODE } from "../../../../constants";

export const checkIsChequeBookApplied = ({
  primaryMobCountryCode,
  primaryPhoneCountryCode,
  accountCurrencies: { isSelectForeignCurrencyAndLocal }
}) => {
  const isSelectedLocalMobilePhone = [primaryMobCountryCode, primaryPhoneCountryCode].includes(
    UAE_CODE
  );

  if (isSelectForeignCurrencyAndLocal || isSelectedLocalMobilePhone) {
    return { isDisabledChequeBook: true, isChequeBookApplied: true };
  }

  return { isDisabledChequeBook: true, isChequeBookApplied: false };
};

export const checkIsDebitCardApplied = ({
  accountSigningInfo: { accountSigningType, authorityType },
  accountCurrencies: { isSelectForeignCurrencyAndLocal, isSelectOnlyForeignCurrency }
}) => {
  const selectedSigningTypesAny = "Any of us";
  const authorityTypeSP = "SP";

  const isAccountSigningTypeAnyOfUs = accountSigningType === selectedSigningTypesAny;

  if (
    isSelectForeignCurrencyAndLocal ||
    isAccountSigningTypeAnyOfUs ||
    authorityType === authorityTypeSP
  ) {
    return { isDisabledDebitCard: true, isDebitCardApplied: true };
  }

  if (isSelectOnlyForeignCurrency) {
    return { isDisabledDebitCard: false, isDebitCardApplied: false };
  }
  return { isDisabledDebitCard: false, isDebitCardApplied: false };
};
