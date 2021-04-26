import callbackRegular from "../../assets/gif/callback_regular.gif";
import callbackElite from "../../assets/gif/callback_elite.gif";
import callbackIslamic from "../../assets/gif/callback_islamic.gif";
import declinedElite from "../../assets/gif/declined_elite.gif";
import declinedRegular from "../../assets/gif/declined_regular.gif";
import declinedIslamic from "../../assets/gif/declined_islamic.gif";

export const ERRORS_TYPE = {
  DEDUPE: "Dedupe Check",
  //ro-assist-brd1-3
  APPLICATION_DEDUPE: "Application Dedupe Check",
  APPLICATION_DEDUPE_INELIGIBLE: "Application Dedupe CheckINELIGIBLE",
  APPLICATION_DEDUPE_DECLINE: "Application Dedupe CheckDECLINE",
  APPLICATION_DEDUPE_PENDING: "Application Dedupe CheckPENDING",
  APPLICATION_DEDUPE_SUCCESS: "Application Dedupe CheckSUCCESS",
  APPLICATION_DEDUPE_WITH_RO: "Application Dedupe CheckWITH_RO",
  VIRTUAL_CURRENCIES: "Virtual Currency Check",
  NOT_ELIGIBLE: "RAK-Starter Account Validation",
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
  //ro-assist-brd1-3
  [ERRORS_TYPE.APPLICATION_DEDUPE]: callbackRegular,
  [ERRORS_TYPE.APPLICATION_DEDUPE_INELIGIBLE]: declinedRegular,
  [ERRORS_TYPE.APPLICATION_DEDUPE_DECLINE]: declinedRegular,
  [ERRORS_TYPE.APPLICATION_DEDUPE_PENDING]: callbackRegular,
  [ERRORS_TYPE.APPLICATION_DEDUPE_SUCCESS]: callbackRegular,
  [ERRORS_TYPE.APPLICATION_DEDUPE_WITH_RO]: callbackRegular,
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
  //ro-assist-brd1-3
  [ERRORS_TYPE.APPLICATION_DEDUPE]: callbackIslamic,
  [ERRORS_TYPE.APPLICATION_DEDUPE_INELIGIBLE]: declinedIslamic,
  [ERRORS_TYPE.APPLICATION_DEDUPE_DECLINE]: declinedIslamic,
  [ERRORS_TYPE.APPLICATION_DEDUPE_PENDING]: callbackIslamic,
  [ERRORS_TYPE.APPLICATION_DEDUPE_SUCCESS]: callbackIslamic,
  [ERRORS_TYPE.APPLICATION_DEDUPE_WITH_RO]: callbackIslamic,
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
  [ERRORS_TYPE.APPLICATION_DEDUPE]: callbackElite,
  [ERRORS_TYPE.APPLICATION_DEDUPE_INELIGIBLE]: declinedElite,
  [ERRORS_TYPE.APPLICATION_DEDUPE_DECLINE]: declinedElite,
  [ERRORS_TYPE.APPLICATION_DEDUPE_PENDING]: callbackElite,
  [ERRORS_TYPE.APPLICATION_DEDUPE_SUCCESS]: callbackElite,
  [ERRORS_TYPE.APPLICATION_DEDUPE_WITH_RO]: callbackElite,
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
