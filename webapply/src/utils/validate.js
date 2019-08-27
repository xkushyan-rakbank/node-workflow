const validate = (field, fieldConfig) => {
  const validity = field.validity;

  const REQUIRED = "required";
  const INVALID = "invalid";

  // Empty field
  if (validity.valueMissing) {
    return fieldConfig.validationErrors[REQUIRED];
  }

  if (validity.typeMismatch) {
    // Email
    if (field.type === "email") {
      return fieldConfig.validationErrors[INVALID];
    }

    // URL
    if (field.type === "url") {
      return fieldConfig.validationErrors[INVALID];
    }
  }

  // If pattern doesn't match
  if (validity.patternMismatch) {
    return fieldConfig.validationErrors[INVALID];
  }

  // If too short
  if (validity.tooShort) {
    return fieldConfig.validationErrors[INVALID];
  }

  // If a number field is over the max
  if (validity.rangeOverflow) {
    return fieldConfig.validationErrors[INVALID];
  }

  // If a number field is below the min
  if (validity.rangeUnderflow) {
    return fieldConfig.validationErrors[INVALID];
  }
};

export default validate;
