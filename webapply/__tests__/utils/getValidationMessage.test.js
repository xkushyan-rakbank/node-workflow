import {
  getRequiredNotTextInputMessage,
  getInvalidMessage,
  getRequiredMessage
} from "../../src/utils/getValidationMessage";

describe.only("getValidationMessage test", () => {
  const fieldName = "Email";

  it("should return string with not filled message", () => {
    const message = "Email is not filled";
    expect(getRequiredNotTextInputMessage(fieldName)).toEqual(message);
  });

  it("should return string with required message", () => {
    const message = "Email is blank";
    expect(getRequiredMessage(fieldName)).toEqual(message);
  });

  it("should return string with invalid message", () => {
    const message = "Email is invalid";
    expect(getInvalidMessage(fieldName)).toEqual(message);
  });
});
