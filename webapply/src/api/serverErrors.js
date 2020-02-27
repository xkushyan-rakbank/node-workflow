import get from "lodash/get";
import { IGNORE_ERROR_CODES, RO_EDIT_APP_ERROR_MESSAGE } from "../constants";

const ERROR_TYPES = {
  RECAPTCHA: "ReCaptchaError",
  VALIDATION: "FieldsValidation",
  OTHER: "Other"
};

// util for easy construct error instances
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ReCaptchaError extends CustomError {}
export class FieldsValidationError extends CustomError {}
export class OtherError extends CustomError {}
export class ROError extends CustomError {}

// WIP
export const throwError = (errors, errorType) => {
  const errorCode = get(errors, "[0].errorCode", "");
  const errorMessage = get(errors, "[0].message", "");
  const isLockStatusByROAgent =
    IGNORE_ERROR_CODES.includes(errorCode) || errorMessage === RO_EDIT_APP_ERROR_MESSAGE;
  switch (errorType) {
    case ERROR_TYPES.RECAPTCHA:
      throw new ReCaptchaError(errorMessage);
    case ERROR_TYPES.VALIDATION:
      throw new FieldsValidationError(errorMessage);
    case ERROR_TYPES.OTHER && isLockStatusByROAgent:
      throw new ROError(errorMessage);
    case ERROR_TYPES.OTHER:
      throw new OtherError(errorMessage);
    default:
      break;
  }
};
