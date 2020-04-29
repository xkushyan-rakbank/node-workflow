import { accountNames, accountTitles } from "../../constants";

export const getTitleForAccountType = accountType => {
  const accountName = Object.keys(accountNames).find(
    accountName => accountNames[accountName] === accountType
  );

  return accountTitles[accountName];
};
