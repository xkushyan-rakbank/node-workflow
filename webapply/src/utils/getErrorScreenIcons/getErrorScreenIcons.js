import { accountNames } from "../../constants";
import {
  ERRORS_TYPE,
  regularErrorScreenGifIcon,
  islamicErrorScreenGifIcon,
  eliteErrorScreenGifIcon
} from "./constants";

export const getErrorScreensIcons = (
  accountType = accountNames.starter,
  isIslamicBanking = false,
  screeningType = ERRORS_TYPE.DEDUPE,
  screeningNotes = ""
) => {
  const iconName = screeningType + (screeningNotes === null ? "" : screeningNotes);
  const { elite, starter, currentAccount } = accountNames;
  if (isIslamicBanking && accountType !== elite) {
    return islamicErrorScreenGifIcon[iconName];
  }

  if ([starter, currentAccount, ""].includes(accountType)) {
    return regularErrorScreenGifIcon[iconName];
  }

  return eliteErrorScreenGifIcon[iconName];
};
