import reducer, { initialState } from "../../../src/store/reducers/reCaptcha";
import { setToken } from "../../../src/store/actions/reCaptcha";
import { resetApplicantInfo } from "../../../src/store/actions/appConfig";

describe("reCaptcha reducers", () => {
  it("should create a reducer to set token", () => {
    const payload = {};
    const expectedState = { ...initialState, token: payload };
    expect(reducer(initialState, setToken(payload))).toStrictEqual(expectedState);
  });

  it("should create a reducer to reset applicant info", () => {
    const expectedState = { ...initialState, token: "" };
    expect(reducer(initialState, resetApplicantInfo())).toStrictEqual(expectedState);
  });
});
