import { FieldsValidationError } from "../../src/api/serverErrors";

describe("server errors test", () => {
  const message = "some message";
  const errorType = "some error type";
  const errorCode = "some error code";
  const errors = [{ errorCode }];

  const error = new FieldsValidationError({
    message,
    errorType,
    errors
  });

  it("should return inputs errors", () => {
    expect(error.getInputsErrors()).toBe(errors);
  });

  it("should return error code", () => {
    expect(error.getErrorCode()).toBe(errorCode);
  });
});
