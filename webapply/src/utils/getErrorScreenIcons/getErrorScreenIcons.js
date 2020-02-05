import { accountNames } from "../../constants";
import {
  regularErrorScreenGifIcon,
  islamicErrorScreenGifIcon,
  eliteErrorScreenGifIcon
} from "./constants";

export const getErrorScreensIcons = (
  accountType = "RAKStarter",
  isIslamicBanking = false,
  screeningType = "Dedupe Check"
) => {
  if (isIslamicBanking && accountType !== accountNames.elite) {
    return islamicErrorScreenGifIcon[screeningType];
  }

  if (
    accountType === accountNames.starter ||
    accountType === accountNames.currentAccount ||
    accountType === ""
  ) {
    return regularErrorScreenGifIcon[screeningType];
  }

  return eliteErrorScreenGifIcon[screeningType];
};
