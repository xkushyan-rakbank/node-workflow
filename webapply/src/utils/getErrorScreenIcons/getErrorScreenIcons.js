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
  const { elite, starter, currentAccount } = accountNames;
  if (isIslamicBanking && accountType !== elite) {
    return islamicErrorScreenGifIcon[screeningType];
  }

  if ([starter, currentAccount, ""].includes(accountType)) {
    return regularErrorScreenGifIcon[screeningType];
  }

  return eliteErrorScreenGifIcon[screeningType];
};
