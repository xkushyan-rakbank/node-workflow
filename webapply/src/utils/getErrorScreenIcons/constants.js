import callbackRegular from "../../assets/gif/callback_regular.gif";
import callbackElite from "../../assets/gif/callback_elite.gif";
import callbackIslamic from "../../assets/gif/callback_islamic.gif";
import declinedElite from "../../assets/gif/declined_elite.gif";
import declinedRegular from "../../assets/gif/declined_regular.gif";
import declinedIslamic from "../../assets/gif/declined_islamic.gif";

export const ERROR_MESSAGES = {
  RO_EDITING:
    "We noticed that your application is incomplete. Not to worry, our team is already working on it.",
  CIF_EXIST: "We already have your application. Not to worry, our team is already working on it."
};
export const ERRORS_TYPE = {
  DEDUPE: "Dedupe Check",
  VIRTUAL_CURRENCIES: "Virtual Currency Check",
  NOT_ELIGIBLE: "RAKStarter Account Check",
  NOT_REGISTERED: "Country Of Incorporation Check",
  BIG_COMPANY: "ShareHolderCount Check",
  BLACKLIST: "Blacklist Check",
  RO_EDITING: "RO_EDITING",
  BLOCK_EDITING: "BLOCK_EDITING",
  COMPANY_AS_STAKEHOLDER: "Company is a Stakeholder Check",
  TOO_MANY_STAKEHOLDERS: "Too many Stakeholders Check"
};
export const regularErrorScreenGifIcon = {
  [ERRORS_TYPE.DEDUPE]: callbackRegular,
  [ERRORS_TYPE.VIRTUAL_CURRENCIES]: declinedRegular,
  [ERRORS_TYPE.NOT_ELIGIBLE]: callbackRegular,
  [ERRORS_TYPE.NOT_REGISTERED]: callbackRegular,
  [ERRORS_TYPE.BIG_COMPANY]: callbackRegular,
  [ERRORS_TYPE.BLACKLIST]: declinedIslamic,
  [ERRORS_TYPE.RO_EDITING]: callbackRegular,
  [ERRORS_TYPE.BLOCK_EDITING]: callbackRegular,
  [ERRORS_TYPE.COMPANY_AS_STAKEHOLDER]: callbackRegular,
  [ERRORS_TYPE.TOO_MANY_STAKEHOLDERS]: callbackRegular
};
export const islamicErrorScreenGifIcon = {
  [ERRORS_TYPE.DEDUPE]: callbackIslamic,
  [ERRORS_TYPE.VIRTUAL_CURRENCIES]: declinedIslamic,
  [ERRORS_TYPE.NOT_ELIGIBLE]: callbackIslamic,
  [ERRORS_TYPE.NOT_REGISTERED]: callbackIslamic,
  [ERRORS_TYPE.BIG_COMPANY]: callbackIslamic,
  [ERRORS_TYPE.BLACKLIST]: declinedIslamic,
  [ERRORS_TYPE.RO_EDITING]: callbackIslamic,
  [ERRORS_TYPE.BLOCK_EDITING]: callbackIslamic,
  [ERRORS_TYPE.COMPANY_AS_STAKEHOLDER]: callbackIslamic,
  [ERRORS_TYPE.TOO_MANY_STAKEHOLDERS]: callbackIslamic
};
export const eliteErrorScreenGifIcon = {
  [ERRORS_TYPE.DEDUPE]: callbackElite,
  [ERRORS_TYPE.VIRTUAL_CURRENCIES]: declinedElite,
  [ERRORS_TYPE.NOT_ELIGIBLE]: callbackElite,
  [ERRORS_TYPE.NOT_REGISTERED]: callbackElite,
  [ERRORS_TYPE.BIG_COMPANY]: callbackElite,
  [ERRORS_TYPE.BLACKLIST]: declinedElite,
  [ERRORS_TYPE.RO_EDITING]: callbackElite,
  [ERRORS_TYPE.BLOCK_EDITING]: callbackElite,
  [ERRORS_TYPE.COMPANY_AS_STAKEHOLDER]: callbackElite,
  [ERRORS_TYPE.TOO_MANY_STAKEHOLDERS]: callbackElite
};
