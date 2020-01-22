import { useSelector } from "react-redux";

import { islamicIconsSet, conventionalIconsSet, eliteIconsSet } from "./constants";
import { accountNames } from "../../constants/index";

export const useIconsByAccount = () => {
  const applicationInfo = useSelector(state => state.appConfig.prospect.applicationInfo) || {};

  if (applicationInfo.islamicBanking && applicationInfo.accountType !== accountNames.elite) {
    return islamicIconsSet;
  }

  if (
    applicationInfo.accountType === accountNames.starter ||
    applicationInfo.accountType === accountNames.currentAccount ||
    applicationInfo.accountType === ""
  ) {
    return conventionalIconsSet;
  }

  return eliteIconsSet;
};
