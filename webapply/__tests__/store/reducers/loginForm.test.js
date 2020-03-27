import reducer, { initialState } from "../../../src/store/reducers/loginForm";
import { loginInfoFormSuccess, logout } from "../../../src/store/actions/loginForm";

describe("loginForm reducer test", () => {
  it("should handle LOGIN_INFO_FORM_SUCCESS action type", () => {
    const response = "some data";
    expect(reducer(undefined, loginInfoFormSuccess(response))).toMatchObject({
      loginResponse: response,
      loginStatus: true
    });
  });

  it("should handle LOGOUT action type", () => {
    expect(reducer({}, logout())).toEqual(initialState);
  });
});
