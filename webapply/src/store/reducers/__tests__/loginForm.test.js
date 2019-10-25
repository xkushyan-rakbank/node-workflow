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

    describe("on 'LOGIN_INFO_FORM_FAIL'", () => {
      const loginInfoFormFailParamObj = {
        errorType: "FieldsValidation",
        errors: [
          {
            fieldPath: "$.userName",
            code: "INVALID",
            errorType: "InvalidField",
            message: "Username is invalid, no special characters allowed",
            developerText: ""
          },
          {
            fieldPath: "$.password",
            code: "INVALID",
            errorType: "InvalidField",
            message: "password is required.",
            developerText: ""
          }
        ]
      };
      let state;

      beforeAll(() => {
        state = loginFormReducer(
          initialState,
          loginFormActions.loginInfoFormFail(loginInfoFormFailParamObj)
        );
      });

      it("should update store value", () => {
        const { loginResponse, loginStatus } = state;
        expect(loginResponse).toEqual(loginInfoFormFailParamObj);

        expect(loginStatus).toEqual(false);
      });
    });

    describe("on 'LOGOUT'", () => {
      let state;

      beforeAll(() => {
        state = loginFormReducer(initialState, loginFormActions.logout());
      });

      it("should update store value", () => {
        const { loginStatus } = state;
        expect(loginStatus).toEqual(false);
      });
    });
  });
});
