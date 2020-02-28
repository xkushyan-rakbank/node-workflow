export const ERROR_TYPES = {
  RECAPTCHA: "ReCaptchaError",
  VALIDATION: "FieldsValidation",
  OTHER: "Other"
};

// util for easy construct error instances
class CustomError extends Error {
  constructor(error) {
    super(error);
    this.name = this.constructor.name;
    this.message = error.message;
    this.errorType = error.errorType;
    this.errors = error.errors;
  }
  getAxiosError() {
    return this.errors;
  }
}

export class ReCaptchaError extends CustomError {}
export class FieldsValidationError extends CustomError {}
export class OtherError extends CustomError {}
export class ROError extends CustomError {}
