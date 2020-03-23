import reducer, { initialState } from "../../../src/store/reducers/loginForm";
import { loginInfoFormSuccess, logout } from "../../../src/store/actions/loginForm";
import { UNMATCHED_ACTION } from "../../../__mocks__/storeMock";


describe("loginForm reducer test", () => {
  it("LOGIN_INFO_FORM_SUCCESS action type", () => {
    const payload = {
      agentName: "VIRTUALUSER",
      agentId: "VTUSER",
      agentRole: "",
      deptName: ""
    };
    const expectedState = {
      ...initialState,
      loginResponse: payload,
      loginStatus: true
    };
    expect(reducer(initialState, loginInfoFormSuccess(payload))).toStrictEqual(expectedState);
  });

  it("LOGOUT action type", () => {
    const expectedState = {
      ...initialState,
      loginResponse: {},
      loginStatus: false
    };
    expect(reducer(initialState, logout())).toStrictEqual(expectedState);
  });

  it("check default action type", () => {
    expect(reducer(undefined, UNMATCHED_ACTION)).toStrictEqual(initialState);
  });
})