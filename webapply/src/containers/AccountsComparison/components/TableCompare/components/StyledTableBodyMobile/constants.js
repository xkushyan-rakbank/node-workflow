import { accountTypes } from "../../constants";

export const FIRST_ROW_POSITION = 1;
export const TABLE_POSITION_OFFSET = 2;

export const COMPARED_ACCOUNTS_TYPES = {
  [accountTypes.starter.id]: [accountTypes.starter.id, accountTypes.currentAccount.id],
  [accountTypes.currentAccount.id]: [accountTypes.currentAccount.id, accountTypes.elite.id],
  [accountTypes.elite.id]: [accountTypes.elite.id, accountTypes.currentAccount.id]
};
