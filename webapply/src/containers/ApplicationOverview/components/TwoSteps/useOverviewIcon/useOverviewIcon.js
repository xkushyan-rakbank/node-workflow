import { useSelector } from "react-redux";

import {
  islamicIconsSet,
  conventionalIconsSet,
  eliteIconsSet,
  eliteIslamicIconsSet
} from "./constants";
import { accountNames } from "../../../../../constants";
import { getAccountType, getIsIslamicBanking } from "../../../../../store/selectors/appConfig";

export const useOverviewIcon = () => {
  const accountType = useSelector(getAccountType);
  const isIslamicBanking = useSelector(getIsIslamicBanking);

  if (isIslamicBanking && accountType !== accountNames.elite) {
    return islamicIconsSet;
  }

  if (isIslamicBanking && accountType === accountNames.elite) {
    return eliteIslamicIconsSet;
  }

  if (
    accountType === accountNames.starter ||
    accountType === accountNames.currentAccount ||
    accountType === ""
  ) {
    return conventionalIconsSet;
  }

  return eliteIconsSet;
};
