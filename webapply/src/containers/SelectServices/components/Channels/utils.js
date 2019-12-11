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
    return true;
  }

  return false;
};

export const checkIsDebitCardApplied = ({
  accountSigningInfo: { accountSigningType, authorityType },
  accountCurrencies: { isSelectForeignCurrencyAndLocal, isSelectOnlyForeignCurrency }
}) => {
  const selectedSigningTypesAny = "Any of us";
  const authorityTypeSP = "SP";

  const isAccountSigningTypeAnyOfUs = accountSigningType === selectedSigningTypesAny;

  if (isSelectOnlyForeignCurrency || !isAccountSigningTypeAnyOfUs) {
    return true;
  }

  if (authorityType === authorityTypeSP || isSelectForeignCurrencyAndLocal) {
    return true;
  }
  return isAccountSigningTypeAnyOfUs;
};
