export const USER_NAME_REGEX = /^([a-zA-Z0-9.]){1,65}$/;
export const PASSWORD_REGEX = /^([a-zA-Z0-9#@_]){1,30}$/;
export const NAME_REGEX = /^([a-zA-Z ])+$/;
export const ALPHA_NUMERIC_SPECIAL_REGEX = /^([a-zA-Z0-9- !@#$%^&*()_+=`~{}[\]|';:.,?><]){1,50}$/;

export const UAE_MOBILE_PHONE_REGEX = /^[0-9]{9}$/;
export const UAE_LANDLINE_PHONE_REGEX = /^[0-9]{8}$/;
export const MIN_NON_UAE_PHONE_LENGTH = 4;
export const MAX_NON_UAE_PHONE_LENGTH = 15;
export const MAX_NAME_IN_BUSINESS_LENGTH = 19;
export const MAX_EXPERIENCE_YEARS_LENGTH = 255;

export const NUMBER_REGEX = /^[0-9]*$/;

export const ALPHANUMERIC_REGEX = /^([a-zA-Z0-9-])*$/;

export const COMPANY_NAME_SPEC_CHAR_REGEX = /^[A-Za-z0-9\s!@#$%^&*()_+=`~\][{}|';:/.,?><-]*$/;
export const COMPANY_NAME_REGEX = /^([a-zA-Z '”`-]){1,30}$/;
export const BANK_NAME_REGEX = /^([a-zA-Z. ]){1,50}$/;
export const CURRENCY_REGEX = /^[0-9]*([.][0-9]{1,2})?$/;
export const ADDRESS_NUMBER_REGEX = /^[A-Za-z0-9 !@#$%^&*()_+=`~{}[\]|';:/.,?><-]*$/;
export const ADDRESS_REGEX = /^[a-zA-Z0-9 @#%*()]{1,50}$/;
export const MOTHERS_MAIDEN_NAME_REGEX = /^([a-zA-Z ]){1,30}$/;
export const EMPLOYMENT_TYPE_REGEX = /^([a-zA-Z ]){1,50}$/;
export const EMIRATES_ID_REGEX = /^784\d{12}$/;
export const SPACE_OCCUPIED_OTHER_REGEX = /^[a-zA-Z. ]{1,50}$/;
export const LICENSE_NUMBER = /^[a-zA-Z0-9-]{1,20}$/;
export const FILE_SIZE = 5 * 1048576;
export const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "application/pdf", "application/txt"];

export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);
export const checkIsTrimmed = (value = "") => value.length === value.trim().length;
