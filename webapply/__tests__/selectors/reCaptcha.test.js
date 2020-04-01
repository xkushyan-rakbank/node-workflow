import {
  getReCaptcha,
  getReCaptchaError,
  getReCaptchaToken
} from "../../src/store/selectors/reCaptcha";

describe("reCaptcha test", () => {
  const token = "some token value";
  const error = "some error string";
  const reCaptcha = { token, error };
  const state = { reCaptcha };

  it("should return reCaptcha", () => {
    expect(getReCaptcha(state)).toEqual(reCaptcha);
  });

  it("should return token", () => {
    expect(getReCaptchaToken(state)).toEqual(token);
  });

  it("should return error", () => {
    expect(getReCaptchaError(state)).toEqual(error);
  });
});
