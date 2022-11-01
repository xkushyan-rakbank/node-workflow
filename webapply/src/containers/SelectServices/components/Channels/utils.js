import { UAE_CODE, SIGNING_TRANSACTIONS_TYPE } from "../../../../constants";

export const checkIsChequeBookApplied = (primaryMobCountryCode, { isSelectedLocalCurrency }) =>
  isSelectedLocalCurrency && primaryMobCountryCode === UAE_CODE;

export const checkIsDebitCardApplied = (
  { accountSigningType },
  { isSelectedLocalCurrency },
  isSingleStakeholder
) =>
  (accountSigningType === SIGNING_TRANSACTIONS_TYPE.ANY || isSingleStakeholder) &&
  isSelectedLocalCurrency;
