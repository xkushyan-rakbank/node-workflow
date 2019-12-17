import { useSelector } from "react-redux";

import { islamicIconsSet, conventionalIconsSet, eliteIconsSet } from "./constants";
import { accountsNames } from "../../constants/index";

export const useIconsByAccount = () => {
  const applicationInfo = useSelector(state => state.appConfig.prospect.applicationInfo) || {};

  if (applicationInfo.islamicBanking) {
    return islamicIconsSet;
  }

  if (applicationInfo.accountType === accountsNames.elite) {
    return eliteIconsSet;
  }

  return conventionalIconsSet;
};
