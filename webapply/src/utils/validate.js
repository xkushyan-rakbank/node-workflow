import get from "lodash/get";

import { errorType } from "../constants";
import { store } from "../store";

export const validate = (field, fieldConfig) => {
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
  }
};

//helper function to check for multilineInvalid errorType
const validationErrorMessages = errorConfig => {
  if (errorType.multilineInvalid in errorConfig) {
    return {
      error: errorConfig[errorType.invalid],
      multiLineError: errorConfig[errorType.multilineInvalid]
    };
  } else {
    return {
      error: errorConfig[errorType.invalid]
    };
  }
};

export const validateForm = event => {
  const fields = event.target.elements;
  const config = get(store.getState(), "appConfig.uiConfig");
  const errorList = [];
  for (let i = 0; i < fields.length; i++) {
    const id = fields[i].id;
    const [configId] = id.split("_");
    const error = validate(fields[i], config[configId]);
    if (error) {
      errorList.push({ id, error, configId });
    }
    fields[i].focus();
  }

  return errorList;
};
