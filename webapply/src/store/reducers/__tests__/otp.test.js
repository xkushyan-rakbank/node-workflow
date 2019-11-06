import initialState from "./../otp";
import otpReducer from "./../otp";
import * as otpActions from "./../../actions/otp";

describe("otpReducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise 'isPending' as a boolean value", () => {
      const { isPending } = initialState;

      expect(isPending).toBeFalsy();
    });
    it("should initialise 'isVerified' as a boolean value", () => {
      const { isVerified } = initialState;

      expect(isVerified).toBeFalsy();
    });
    it("should initialise 'verificationError' as a boolean value", () => {
      const { verificationError } = initialState;

      expect(verificationError).toBeFalsy();
    });
    it("should initialise 'mode' as an undefined value", () => {
      const { mode } = initialState;

      expect(mode).toBeUndefined();
    });
    it("should initialise 'otpTokenValidityInSec' as an undefined value", () => {
      const { otpTokenValidityInSec } = initialState;

      expect(otpTokenValidityInSec).toBeUndefined();
    });
    it("should initialise 'otpTokenValidUntil' as an undefined value", () => {
      const { otpTokenValidUntil } = initialState;

      expect(otpTokenValidUntil).toBeUndefined();
    });
  });

  describe("otpReducer", () => {
    describe("on 'GENERATE_OTP_CODE'", () => {
      const otpParamObj = {
        verificationError: false,
        isVerified: false,
        isGenerated: false,
        mode: "",
        otpTokenValidityInSec: "",
        otpTokenValidUntil: "",
        isPending: true,
        error: ""
      };

      let state;

      beforeAll(() => {
        state = otpReducer(initialState, otpActions.generateOtpCode());
      });

      it("should update store value", () => {
        const { otp } = state;
        expect(otp).toEqual(otpParamObj);
      });
    });
    describe("on GENERATE_CODE_SUCCESS", () => {
      const otpParamSuccessObj = {
        mode: "",
        otpTokenValidityInSec: "",
        otpTokenValidUntil: "",
        isGenerated: true,
        isPending: false,
        generatedAt: Date.now()
      };

      let state;

      beforeAll(() => {
        state = otpReducer(initialState, otpActions.generateCodeSuccess());
      });

      it("should update store value", () => {
        const { otpSuccess } = state;
        expect(otpSuccess).toEqual(otpParamSuccessObj);
      });
    });
    describe("on VERIFY_OTP", () => {
      const verifyOtpParam = {
        verificationError: false,
        isVerified: false,
        isPending: true
      };

      let state;

      beforeAll(() => {
        state = otpReducer(initialState, otpActions.verifyOtp());
      });

      it("should update store value", () => {
        const { verifyOtp } = state;
        expect(verifyOtp).toEqual(verifyOtpParam);
      });
    });
    describe("on VERIFY_CODE_SUCCESS", () => {
      const verifyOtpSuccessParam = {
        isVerified: true,
        verificationError: false,
        isPending: false
      };

      let state;

      beforeAll(() => {
        state = otpReducer(initialState, otpActions.verifyCodeSuccess());
      });

      it("should update store value", () => {
        const { verifyOtpSuccess } = state;
        expect(verifyOtpSuccess).toEqual(verifyOtpSuccessParam);
      });
    });
    describe("on VERIFY_CODE_FAILED", () => {
      const verifyOtpFailedParam = {
        isVerified: false,
        verificationError: true,
        isPending: false
      };

      let state;

      beforeAll(() => {
        state = otpReducer(initialState, otpActions.verifyCodeFailed());
      });

      it("should update store value", () => {
        const { verifyOtpFailed } = state;
        expect(verifyOtpFailed).toEqual(verifyOtpFailedParam);
      });
    });
    describe("on default", () => {
      const mockAction = { type: undefined };
      const state = otpReducer(initialState, mockAction);
      expect(state).toBe(initialState);
    });
  });
});
