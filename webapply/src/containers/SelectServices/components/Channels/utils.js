import { UAE_CODE } from "../../../../constants";

const updateValueCheckBox = (name, prevValue, newValue, updateProspect) => {
  if (newValue !== prevValue) {
    updateProspect({ [name]: newValue });
  }
};

export const getStatusIsChequeBookApplied = ({
  primaryMobCountryCode,
  primaryPhoneCountryCode,
  chequeBook: { name, value },
  accountCurrencies,
  updateProspect
}) => {
  const { isSelectForeignCurrencyAndLocal, isSelectOnlyForeignCurrency } = accountCurrencies;

  const basedMobileNumberForCompany = new Set([primaryMobCountryCode, primaryPhoneCountryCode]);
  const isSelectedLocalMobilePhone = basedMobileNumberForCompany.has(UAE_CODE);

  if (isSelectForeignCurrencyAndLocal || isSelectedLocalMobilePhone) {
    updateValueCheckBox(name, value, true, updateProspect);
    return true;
  }

  if (isSelectOnlyForeignCurrency || !isSelectedLocalMobilePhone) {
    return false;
  }

  return false;
};

export const getStatusIsDebitCardApplied = ({
  accountSigningInfo: { accountSigningType, authorityType },
  debitCardApplied: { name, value },
  accountCurrencies,
  updateProspect
}) => {
  const selectedSigningTypesAny = "Any of us";
  const authorityTypeSP = "SP";

  const isAccountSigningTypeAnyOfUs = accountSigningType === selectedSigningTypesAny;
  const { isSelectForeignCurrencyAndLocal, isSelectOnlyForeignCurrency } = accountCurrencies;

  if (isSelectOnlyForeignCurrency || !isAccountSigningTypeAnyOfUs) {
    updateValueCheckBox(name, value, false, updateProspect);
    return true;
  }

  if (authorityType === authorityTypeSP || isSelectForeignCurrencyAndLocal) {
    updateValueCheckBox(name, value, true, updateProspect);
    return true;
  }

  updateValueCheckBox(name, value, isAccountSigningTypeAnyOfUs, updateProspect);
  return isAccountSigningTypeAnyOfUs;
};
