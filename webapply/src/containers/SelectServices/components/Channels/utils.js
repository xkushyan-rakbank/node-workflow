import { UAE_CODE, SIGNING_TRANSACTIONS_TYPE } from "../../../../constants";

export const checkIsChequeBookApplied = (primaryMobCountryCode, { isSelectedLocalCurrency }) =>
  isSelectedLocalCurrency && primaryMobCountryCode === UAE_CODE;

export const checkIsDebitCardApplied = ({ accountSigningType }, { isSelectedLocalCurrency }) =>
  (accountSigningType === SIGNING_TRANSACTIONS_TYPE.ANY ||
    accountSigningType === SIGNING_TRANSACTIONS_TYPE.SINGLY) &&
  isSelectedLocalCurrency;
