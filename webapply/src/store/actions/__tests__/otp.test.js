import * as otpActions from "./../otp";

describe("otp", () => {
  describe("ActionTypes", () => {
    it("should have a proper name for 'GENERATE_OTP_CODE'", () => {
      expect(otpActions.GENERATE_OTP_CODE).toBe("OTP/GENERATE_OTP_CODE");
    });
    it("should have a proper name for 'GENERATE_CODE_SUCCESS'", () => {
      expect(otpActions.GENERATE_CODE_SUCCESS).toBe("OTP/GENERATE_CODE_SUCCESS");
    });
    it("should have a proper name for 'VERIFY_OTP'", () => {
      expect(otpActions.VERIFY_OTP).toBe("OTP/VERIFY_OTP");
    });
    it("should have a proper name for 'VERIFY_CODE_SUCCESS'", () => {
      expect(otpActions.VERIFY_CODE_SUCCESS).toBe("OTP/VERIFY_CODE_SUCCESS");
    });
  });

  describe("actions", () => {
    describe("generateOtpCode", () => {
      it("should return an action with type of 'GENERATE_OTP_CODE'", () => {
        const { type } = otpActions.generateOtpCode();
        expect(type).toBe(otpActions.GENERATE_OTP_CODE);
      });
    });

    describe("generateCodeSuccess", () => {
      it("should return an action with type of 'GENERATE_CODE_SUCCESS'", () => {
        const { type } = otpActions.generateCodeSuccess();
        expect(type).toBe(otpActions.GENERATE_CODE_SUCCESS);
      });

      it("should return an action with the response data in its payload", () => {
        const otpCodeSuccessParamObj = {
          mode: "",
          otpTokenValidityInSec: "",
          otpTokenValidUntil: ""
        };
        const { payload } = otpActions.generateCodeSuccess(otpCodeSuccessParamObj);

        expect(payload).toBe(otpCodeSuccessParamObj);
      });
    });

    describe("verifyOtp", () => {
      it("should return an action with type of 'VERIFY_OTP'", () => {
        const { type } = otpActions.verifyOtp();
        expect(type).toBe(otpActions.VERIFY_OTP);
      });

      it("should return an action with the response data in its payload", () => {
        const verifyOtpParamObj = {
          verified: true,
          prospects: [
            {
              _links: {
                self: {
                  href: "​/banks​/RAK​/usertypes​/sme​/prospects​/COSME007"
                }
              },
              prospectId: "COSME006",
              fullName: "CUSTOMER ONBOARDING",
              email: "sc_otp@email.com",
              countryCode: "+971",
              mobileNo: "0123456789"
            }
          ]
        };
        const { payload } = otpActions.verifyOtp(verifyOtpParamObj);

        expect(payload).toBe(verifyOtpParamObj);
      });
    });

    describe("verifyCodeSuccess", () => {
      it("should return an action with type of 'VERIFY_CODE_SUCCESS'", () => {
        const { type } = otpActions.verifyCodeSuccess();
        expect(type).toBe(otpActions.VERIFY_CODE_SUCCESS);
      });

      it("should return an action with the response data in its payload", () => {
        const verifyOtpCodeSuccessParamObj = {};

        const { payload } = otpActions.verifyOtp(verifyOtpCodeSuccessParamObj);

        expect(payload).toBe(verifyOtpCodeSuccessParamObj);
      });
    });

    describe("verifyCodeFailed", () => {
      it("should return an action with type of 'VERIFY_CODE_FAILED'", () => {
        const { type } = otpActions.verifyCodeFailed();
        expect(type).toBe(otpActions.VERIFY_CODE_FAILED);
      });

      it("should return an action with the response data in its payload", () => {
        const verifyOtpCodeFailedParamObj = {};

        const { payload } = otpActions.verifyOtp(verifyOtpCodeFailedParamObj);

        expect(payload).toBe(verifyOtpCodeFailedParamObj);
      });
    });
  });
});
