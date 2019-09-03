import { errorType } from "./../constants";

const validate = (field, fieldConfig) => {
  if (fieldConfig) {
    const validity = field.validity;
    const errorConfig = fieldConfig.validationErrors;

    if (validity.valid) return;

    // Empty field
    if (validity.valueMissing || field.value === "") {
      return {
        error: errorConfig[errorType.required]
      };
    }

    // If field value is not the correct syntax.
    if (validity.typeMismatch) {
      if (field.type === "email") {
        const errors = validationErrorMessages(errorConfig);
        return errors;
      }
    }

    // If pattern doesn't match
    if (validity.patternMismatch) {
      const errors = validationErrorMessages(errorConfig);
      return errors;
    }

    // If too short
    if (validity.tooShort) {
      const errors = validationErrorMessages(errorConfig);
      return errors;
    }

    // If too long
    if (validity.tooLong) {
      const errors = validationErrorMessages(errorConfig);
      return errors;
    }

    // if the user has provided input that the browser is unable to convert
    if (validity.badInput) {
      const errors = validationErrorMessages(errorConfig);
      return errors;
    }

    // If a number field is over the max
    if (validity.rangeOverflow) {
      const errors = validationErrorMessages(errorConfig);
      return errors;
    }

    // If a number field is below the min
    if (validity.rangeUnderflow) {
      const errors = validationErrorMessages(errorConfig);
      return errors;
    }
  }
};

//helper function to check for multiline errorType
const validationErrorMessages = errorConfig => {
  if (errorType.multiline in errorConfig) {
    return {
      error: errorConfig[errorType.invalid],
      multiLineError: errorConfig[errorType.multiline]
    };
  } else {
    return {
      error: errorConfig[errorType.invalid]
    };
  }
};

export default validate;
