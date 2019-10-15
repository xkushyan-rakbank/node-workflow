import * as loginFormActions from "./../loginForm";

describe("login-form", () => {
  describe("ActionTypes", () => {
    it("should have a proper name for 'LOGIN_INFO_FORM'", () => {
      expect(loginFormActions.LOGIN_INFO_FORM).toBe("LOGIN_INFO_FORM");
    });
    it("should have a proper name for 'LOGIN_INFO_FORM_SUCCESS'", () => {
      expect(loginFormActions.LOGIN_INFO_FORM_SUCCESS).toBe("LOGIN_INFO_FORM_SUCCESS");
    });
    it("should have a proper name for 'LOGIN_INFO_FORM_FAIL'", () => {
      expect(loginFormActions.LOGIN_INFO_FORM_FAIL).toBe("LOGIN_INFO_FORM_FAIL");
    });
  });

  describe("actions", () => {
    describe("loginInfoForm", () => {
      it("should return an action with type of 'LOGIN_INFO_FORM'", () => {
        const { type } = loginFormActions.loginInfoForm();
        expect(type).toBe(loginFormActions.LOGIN_INFO_FORM);
      });
      it("should return an action with the provided parameters as its payload", () => {
        const loginInfoFormParamObj = {
          username: "admin",
          password: "admin@100"
        };
        const { payload } = loginFormActions.loginInfoForm(loginInfoFormParamObj);
        expect(payload).toBe(loginInfoFormParamObj);
      });
    });

    describe("loginInfoFormSuccess", () => {
      it("should return an action with type of 'LOGIN_INFO_FORM_SUCCESS'", () => {
        const { type } = loginFormActions.loginInfoFormSuccess();
        expect(type).toBe(loginFormActions.LOGIN_INFO_FORM_SUCCESS);
      });

      it("should return an action with the response data in its payload", () => {
        const loginInfoFormSuccessParamObj = {
          agentName: "Kapil Verma",
          agentId: "",
          agentRole: "",
          deptName: ""
        };
        const { payload } = loginFormActions.loginInfoFormSuccess(loginInfoFormSuccessParamObj);

        expect(payload).toBe(loginInfoFormSuccessParamObj);
      });
    });
  });
});
