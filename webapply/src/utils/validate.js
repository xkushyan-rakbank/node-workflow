import data from "./../data.json";

const validate = (event, inputId = "UI0001") => {
  const inputConfig = data[inputId];
  const field = event.target;
  const validity = field.validity;
  const REQUIRED = "required";
  const INVALID = "invalid";

  // Empty field
  if (validity.valueMissing) {
    return inputConfig.validation[REQUIRED];
  }

  if (validity.typeMismatch) {
    // Email
    if (field.type === "email") {
      return inputConfig.validation[INVALID];
    }

    // URL
    if (field.type === "url") {
      return inputConfig.validation[INVALID];
    }
  }

  // If too short
  if (validity.tooShort) {
    return inputConfig.validation[INVALID];
  }

  // If a number field is over the max
  if (validity.rangeOverflow) {
    return inputConfig.validation[INVALID];
  }

  // If a number field is below the min
  if (validity.rangeUnderflow) {
    return inputConfig.validation[INVALID];
  }
};

export default validate;
