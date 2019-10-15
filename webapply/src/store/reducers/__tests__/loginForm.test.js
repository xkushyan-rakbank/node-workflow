import { initialState } from "./../../reducers/loginForm";
import loginFormReducer from "./../../reducers/loginForm";
import * as loginFormActions from "./../../actions/loginForm";

describe("loginFormReducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise 'loginResponse' as an empty array", () => {
      const { loginResponse } = initialState;
      expect(loginResponse).toEqual({});
    });

    it("should initialise 'loginStatus' as 'false'", () => {
      const { loginStatus } = initialState;
      expect(loginStatus).toBeFalsy();
    });
  });

  describe("reducer", () => {
    describe("on 'LOGIN_INFO_FORM_SUCCESS'", () => {
      const loginInfoFormSuccessParamObj = {
        agentName: "Kapil Verma",
        agentId: "",
        agentRole: "",
        deptName: ""
      };
      let state;

      beforeAll(() => {
        state = loginFormReducer(
          initialState,
          loginFormActions.loginInfoFormSuccess(loginInfoFormSuccessParamObj)
        );
      });

      it("should update store value", () => {
        const { loginResponse } = state;
        expect(loginResponse).toEqual(loginInfoFormSuccessParamObj);
      });
    });
  });
});
