export const ERROR_TYPES = {
  RECAPTCHA: "ReCaptchaError",
  VALIDATION: "FieldsValidation",
  OTHER: "Other"
};

class CustomError extends Error {
  constructor(error) {
    super(error);
    this.name = this.constructor.name;
    this.message = error.message;
    this.errorType = error.errorType;
    this.errors = error.errors;
    this.errorCode = error.errors[0].errorCode;
  }
  getInputsErrors() {
    return this.errors;
  }
  getErrorCode() {
    return this.errorCode;
  }
}

export class ReCaptchaError extends CustomError {}
export class FieldsValidationError extends CustomError {}
export class ErrorOccurredWhilePerforming extends CustomError {}
