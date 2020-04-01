import {
  getServerValidation,
  getServerValidationInputs,
  getInputServerValidityByPath
} from "../../../src/store/selectors/serverValidation";

describe("serverValidation selectors test", () => {
  const path = "some path";
  const value = "some value";
  const inputs = { [path]: value };
  const serverValidation = { inputs };
  const state = { serverValidation };

  it("should return server validation data", () => {
    expect(getServerValidation(state)).toBe(serverValidation);
  });

  it("should return server validation inputs data", () => {
    expect(getServerValidationInputs(state)).toBe(inputs);
  });

  it("should return server validation inputs data by testing path", () => {
    expect(getInputServerValidityByPath(state, path)).toBe(value);
  });

  it("should return null when server validation inputs does not exists testing path", () => {
    expect(getInputServerValidityByPath(state, "not exists path")).toBe(null);
  });
});
