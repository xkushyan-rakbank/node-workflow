export const USER_NAME_REGEX = /^([a-zA-Z0-9.]){1,65}$/;
export const PASSWORD_REGEX = /^([a-zA-Z0-9#@_]){1,30}$/;
export const NAME_REGEX = /^([a-zA-Z ])+$/;
export const NUMBER_REGEX = /^[0-9]*$/;
export const ALPHANUMERIC_REGEX = /^([a-zA-Z0-9-])*$/;

export const UAE_MOBILE_PHONE_REGEX = /^[0-9]{9}$/;
export const UAE_LANDLINE_PHONE_REGEX = /^[0-9]{8}$/;
export const MIN_NON_UAE_PHONE_LENGTH = 4;
export const MAX_NON_UAE_PHONE_LENGTH = 22;
export const MAX_NAME_IN_BUSINESS_LENGTH = 19;
export const MAX_EXPERIENCE_YEARS_LENGTH = 255;

// "Allowed Special Characters" based on swagger 0.0.21
const SPECIAL_CHARACTERS = "a-zA-Z0-9.@#%*() -";
const allowedSpecialCharacters = (maxLen, flags = "") =>
  new RegExp(`^([${SPECIAL_CHARACTERS}]){1,${maxLen}}$`, flags);
export const ADDRESS_NUMBER_REGEX = allowedSpecialCharacters(10);
export const COMPANY_NAME_REGEX = allowedSpecialCharacters(30);
export const ALPHA_NUMERIC_SPECIAL_REGEX = allowedSpecialCharacters(255);
export const BANK_NAME_REGEX = allowedSpecialCharacters(50);
export const ACCOUNT_SIGNING_INSTN_REGEX = allowedSpecialCharacters(50);
export const EMPLOYMENT_TYPE_REGEX = allowedSpecialCharacters(50);
export const ADDRESS_REGEX = allowedSpecialCharacters(50);
export const LICENSE_NUMBER = allowedSpecialCharacters(20);

export const CURRENCY_REGEX = /^[0-9]*([.][0-9]{1,2})?$/;
export const MOTHERS_MAIDEN_NAME_REGEX = /^([a-zA-Z]){1,30}$/;
export const EMIRATES_ID_REGEX = /^784\d{12}$/;
export const SPACE_OCCUPIED_OTHER_REGEX = /^[a-zA-Z. ]{1,50}$/;
export const POBOX_REGEX = /^([a-zA-Z0-9])*$/;

export const FILE_SIZE = 5 * 1048576;
export const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "application/pdf", "application/txt"];

export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);
export const checkIsTrimmed = (value = "") => value.length === value.trim().length;
