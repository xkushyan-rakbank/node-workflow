import { getSelectedTypeCurrency } from "../../../../utils/SelectServices";

const updateValueCheckBox = (name, prevValue, newValue, updateProspect) => {
  if (newValue !== prevValue) {
    updateProspect({ [name]: newValue });
  }
};

export const getStatusChequeBookApplied = props => {
  const {
    primaryMobCountryCode,
    primaryPhoneCountryCode,
    chequeBook: { name, value },
    accountCurrencies,
    updateProspect
  } = props;

  const { isSelectForeignCurrencyAndLocal, isSelectOnlyForeignCurrency } = getSelectedTypeCurrency(
    accountCurrencies
  );

  const mobCountryCode = "971";
  const basedMobileNumberForCompany = new Set([primaryMobCountryCode, primaryPhoneCountryCode]);
  const isSelectedLocalMobilePhone = basedMobileNumberForCompany.has(mobCountryCode);

  if (isSelectForeignCurrencyAndLocal || isSelectedLocalMobilePhone) {
    updateValueCheckBox(name, value, true, updateProspect);
    return { isDisabledChequeBook: true };
  }

  if (isSelectOnlyForeignCurrency || !isSelectedLocalMobilePhone) {
    return { isDisabledChequeBook: false };
  }

  return { isDisabledChequeBook: false };
};

export const getStatusDebitCardApplied = props => {
  const {
    accountSigningInfo: { accountSigningType, authorityType },
    debitCardApplied: { name, value },
    accountCurrencies,
    updateProspect
  } = props;
  const selectedSigningTypesAny = "Any of us";
  const authorityTypeSP = "SP";

  const accountSigningTypeAnyOfUs = accountSigningType === selectedSigningTypesAny;

  const { isSelectForeignCurrencyAndLocal, isSelectOnlyForeignCurrency } = getSelectedTypeCurrency(
    accountCurrencies
  );

  if (isSelectOnlyForeignCurrency || !accountSigningTypeAnyOfUs) {
    updateValueCheckBox(name, value, false, updateProspect);
    return { isDisabledDebitCard: true };
  }

  if (authorityType === authorityTypeSP || isSelectForeignCurrencyAndLocal) {
    updateValueCheckBox(name, value, true, updateProspect);
    return { isDisabledDebitCard: true };
  }

  updateValueCheckBox(name, value, accountSigningTypeAnyOfUs, updateProspect);
  return { isDisabledDebitCard: accountSigningTypeAnyOfUs };
};
