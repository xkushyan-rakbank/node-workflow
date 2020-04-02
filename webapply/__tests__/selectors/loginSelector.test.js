import {
  checkLoginStatus,
  getAgentName,
  getLoginResponse
} from "../../src/store/selectors/loginSelector";

describe("loginSelector test", () => {
  const loginStatus = "some login status";
  const agentName = "some login response";
  const loginResponse = { agentName };
  const state = { login: { loginStatus, loginResponse } };

  it("should return loginStatus", () => {
    expect(checkLoginStatus(state)).toBe(loginStatus);
  });

  it("should return empty object when loginResponse is not set", () => {
    expect(getLoginResponse({ login: {} })).toEqual({});
  });

  it("should return loginStatus", () => {
    expect(getLoginResponse(state)).toEqual(loginResponse);
  });

  it("should return agentName", () => {
    expect(getAgentName(state)).toBe(agentName);
  });
});
