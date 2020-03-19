import { setToken, SET_TOKEN } from "../../../src/store/actions/reCaptcha";

describe("reCaptcha actions", () => {
  it("should create an action to set token", () => {
    const payload = "token";
    const expectedAction = {
      type: SET_TOKEN,
      payload
    };
    expect(setToken(payload)).toEqual(expectedAction);
  });
});
