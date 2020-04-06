import { getValidationErrors } from "../../../src/store/selectors/validationErrors";

describe("validationErrors selectors test", () => {
  const validationErrors = "some validationErrors";
  const state = { validationErrors };

  it("should return validation errors", () => {
    expect(getValidationErrors(state)).toBe(validationErrors);
  });
});
