export const USER_NAME_REGEX = /^([a-zA-Z0-9.]){1,65}$/;
export const PASSWORD_REGEX = /^([a-zA-Z0-9#@_]){1,30}$/;
export const NAME_REGEX = /^([a-zA-Z '”`-]){1,79}$/;

export const UAE_MOBILE_PHONE_REGEX = /^[0-9]{9}$/;
export const UAE_LANDLINE_PHONE_REGEX = /^[0-9]{8}$/;
export const MIN_NON_UAE_PHONE_LENGTH = 4;
export const MAX_NON_UAE_PHONE_LENGTH = 22;

export const NUMBER_REGEX = /^[0-9]*$/;

export const ALPHANUMERIC_REGEX = /^([a-zA-Z0-9])*$/;

export const COMPANY_NAME_REGEX = /^([a-zA-Z '”`-]){1,30}$/;
export const BANK_NAME_REGEX = /^([a-zA-Z. ]){1,50}$/;
export const CURRENCY_REGEX = /^[0-9]*([.][0-9]{1,2})?$/;
export const ADDRESS_NUMBER_REGEX = /^[a-zA-Z0-9\\@\\#\\%\\*\\(\\)]{1,50}$/;
export const ADDRESS_REGEX = /^[a-zA-Z0-9 \\@\\#\\%\\*\\(\\)]{1,50}$/;
export const MOTHERS_MAIDEN_NAME_REGEX = /^([a-zA-Z])*$/;
export const EMPLOYMENT_TYPE_REGEX = /^([a-zA-Z ]){1,50}$/;
export const DESIGNATION_REGEX = /^([a-zA-Z -]){1,50}$/;
export const WEALTH_TYPE__REGEX = /^([a-zA-Z ]){1,50}$/;
export const EMIRATES_ID_REGEX = /^784\d{12}$/;
export const SPACE_OCCUPIED_OTHER_REGEX = /^[a-zA-Z. ]{1,50}$/;
export const TOTAL_EXPERIENCE_YEARS = /^[0-9]{1,255}$/;

export const FILE_SIZE = 5 * 1048576;
export const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "application/pdf", "application/txt"];
