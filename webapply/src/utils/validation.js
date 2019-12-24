export const USER_NAME_REGEX = /^([a-zA-Z0-9.]){1,65}$/;
export const PASSWORD_REGEX = /^([a-zA-Z0-9#@_]){1,30}$/;
export const NAME_REGEX = /^([a-zA-Z '”`-]){1,79}$/;
export const PHONE_REGEX = /^[0-9]{9,14}$/;
export const NUMBER_REGEX = /^[0-9]*$/;

export const COMPANY_NAME_REGEX = /^([a-zA-Z '”`-]){1,30}$/;
export const LEAD_LICENSE_REGEX = /^([a-zA-Z0-9])*$/;
export const BANK_NAME_REGEX = /^([a-zA-Z. ]){1,50}$/;
export const TRADE_LICENSE_REGEX = /^([a-zA-Z0-9]){1,20}$/;
export const ANNUAL_TURNOVER_REGEX = /^[0-9]{1,10}([.][0-9]{1,2})*$/;
export const ADDRESS_NUMBER_REGEX = /^[a-zA-Z0-9\\@\\#\\%\\*\\(\\)]{1,50}$/;
export const PO_NUMBER_REGEX = /^[0-9]{1,100}$/;
export const MOTHERS_MAIDEN_NAME_REGEX = /^([a-zA-Z]){1,50}$/;
export const EMPLOYMENT_TYPE_REGEX = /^([a-zA-Z ]){1,50}$/;
export const DESIGNATION_REGEX = /^([a-zA-Z]){1,50}$/;
export const WEALTH_TYPE__REGEX = /^([a-zA-Z ]){1,50}$/;
export const EMIRATES_ID_REGEX = /^784-\d{4}-\d{7}-\d$/;
export const PASSPORT_NUMBER_REGEX = /^[a-zA-Z0-9]{1,100}$/;
export const SPACE_OCCUPIED_OTHER_REGEX = /^[a-zA-Z. ]{1,50}$/;

export const FILE_SIZE = 5 * 1048576;
export const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "application/pdf", "application/txt"];
