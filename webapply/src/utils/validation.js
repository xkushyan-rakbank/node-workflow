// "Allowed Special Characters" based on swagger 0.0.21
export const SPECIAL_CHARACTERS_REGEX = /^([a-zA-Z0-9.@#%*()/ -])*$/;

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

export const CURRENCY_REGEX = /^[0-9]*([.][0-9]{1,2})?$/;
export const MOTHERS_MAIDEN_NAME_REGEX = /^([a-zA-Z]){1,30}$/;
export const EMIRATES_ID_REGEX = /^784\d{12}$/;
export const SPACE_OCCUPIED_OTHER_REGEX = /^[a-zA-Z. ]{1,50}$/;
export const POBOX_REGEX = /^([a-zA-Z0-9])*$/;

export const FILE_SIZE = 5 * 1048576;
export const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "application/pdf", "application/txt"];

export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);
export const checkIsTrimmed = (value = "") => value.length === value.trim().length;
