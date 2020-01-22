import { useSelector } from "react-redux";

import { islamicIconsSet, conventionalIconsSet, eliteIconsSet } from "./constants";
import { accountsNames } from "../../constants/index";
import { getAccountType, getIsIslamicBanking } from "../../store/selectors/appConfig";

export const useIconsByAccount = () => {
  const accountType = useSelector(getAccountType);
  const isIslamicBanking = useSelector(getIsIslamicBanking);

  if (isIslamicBanking && accountType !== accountsNames.elite) {
    return islamicIconsSet;
  }

  if (
    accountType === accountsNames.starter ||
    accountType === accountsNames.currentAccount ||
    accountType === ""
  ) {
    return conventionalIconsSet;
  }

  return eliteIconsSet;
};
