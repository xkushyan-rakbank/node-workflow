/* istanbul ignore file */

import * as Yup from "yup";
import { getInvalidMessage } from "./getValidationMessage";
import { UAE_CODE } from "../constants";
// "Allowed Special Characters" based on swagger 0.0.21
export const SPECIAL_CHARACTERS_REGEX = /^([a-zA-Z0-9.@#%*()/ -])*$/;

export const TOTAL_EXPERIENCE_YRS_REGEX = /^([a-zA-Z0-9.,@#%*()/ -])*$/;
export const LICENSE_NUMBER_REGEX = /^([a-zA-Z0-9.@#%*()/-])*$/;
export const USER_NAME_REGEX = /^([a-zA-Z0-9.]){1,65}$/;
export const PASSWORD_REGEX = /^([a-zA-Z0-9#@_]){1,30}$/;
export const NAME_REGEX = /^([a-zA-Z ])+$/;
export const NUMBER_REGEX = /^[0-9]*$/;
export const ALPHANUMERIC_REGEX = /^([a-zA-Z0-9-])*$/;

export const UAE_MOBILE_PHONE_REGEX = /^[0-9]{9}$/;
export const UAE_LANDLINE_PHONE_REGEX = /^[0-9]{8}$/;
export const MIN_NON_UAE_PHONE_LENGTH = 4;
export const MAX_NON_UAE_PHONE_LENGTH = 10;
export const MAX_NAME_IN_BUSINESS_LENGTH = 19;
export const MAX_EXPERIENCE_YEARS_LENGTH = 255;
export const MAX_SOURCE_OF_FUNDS_OTHERS_LENGTH = 50;

export const EMIRATES_ID_REGEX = /^784\d{12}$/;
export const GLOBAL_INTERMEDIARY_REGEX = /^[a-zA-Z- 0-9]{19}$/;
export const SPACE_OCCUPIED_OTHER_REGEX = /^[a-zA-Z. ]{1,50}$/;
export const POBOX_REGEX = /^([a-zA-Z0-9])*$/;

// eslint-disable-next-line max-len
export const WEBSITE_REGEX = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
export const FILE_SIZE = 5 * 1048576;
export const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "application/pdf", "application/txt"];

export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);
export const checkIsTrimmed = (value = "") => value.length === value.trim().length;

export const addPhoneNoValidationToYup = () => {
  Yup.addMethod(Yup.string, "phoneNo", function({
    fieldName = "Mobile Number",
    codeFieldName = "countryCode",
    isLandline = false
  }) {
    return this.when(codeFieldName, {
      is: countryCode => countryCode === UAE_CODE,
      then: Yup.string().matches(
        isLandline ? UAE_LANDLINE_PHONE_REGEX : UAE_MOBILE_PHONE_REGEX,
        getInvalidMessage(fieldName)
      ),
      otherwise: Yup.string()
        .matches(NUMBER_REGEX, getInvalidMessage(fieldName))
        .min(MIN_NON_UAE_PHONE_LENGTH, getInvalidMessage(fieldName))
        .max(MAX_NON_UAE_PHONE_LENGTH, getInvalidMessage(fieldName))
    });
  });
};

export const documentValidationSchema = Yup.object().shape({
  file: Yup.mixed()
    .test("size", "File size exceeded (5Mb maximum)", value => value && value.size <= FILE_SIZE)
    .test(
      "type",
      "Supported formats are PDF, JPG and PNG",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )
});
