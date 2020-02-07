import { accountNames } from "../../constants";
import { ERRORS_TYPE } from "./constants";
import {
  regularErrorScreenGifIcon,
  islamicErrorScreenGifIcon,
  eliteErrorScreenGifIcon
} from "./constants";

export const getErrorScreensIcons = (
  accountType = accountNames.starter,
  isIslamicBanking = false,
  screeningType = ERRORS_TYPE.DEDUPE
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
