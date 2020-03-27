import reducer from "../../../src/store/reducers/otp";
import {
  generateOtpCode,
  verifyOtp,
  setOtpPendingRequest,
  setGeneratingCode,
  generateCodeSuccess,
  verifyCodeSuccess,
  verifyCodeFailed,
  verifyClearError
} from "../../../src/store/actions/otp";
import { applicantInfoFormPromisify } from "../../../src/store/actions/applicantInfoForm";

describe("otp reducer test", () => {
  it("should handle VERIFY_OTP action type", () => {
    expect(reducer(undefined, verifyOtp())).toMatchObject({
      verificationError: false,
      isVerified: false,
      isPending: true
    });
  });

  it("should handle APPLICANT_INFO_FORM, GENERATE_OTP_CODE actions type", () => {
    const expectedState = {
      verificationError: false,
      isVerified: false,
      isGenerating: true,
      isGenerated: false,
      mode: "",
      otpTokenValidityInSec: "",
      otpTokenValidUntil: "",
      isPending: false,
      error: ""
    };

    expect(reducer(undefined, applicantInfoFormPromisify({}))).toMatchObject(expectedState);
    expect(reducer(undefined, generateOtpCode(""))).toMatchObject(expectedState);
  });

  it("should handle SET_PENDING action type", () => {
    const isPending = true;

    expect(reducer(undefined, setOtpPendingRequest(isPending))).toMatchObject({ isPending });
  });

  it("should handle SET_GENERATING action type", () => {
    const isGenerating = true;

    expect(reducer(undefined, setGeneratingCode(isGenerating))).toMatchObject({ isGenerating });
  });

  it("should handle GENERATE_CODE_SUCCESS action type", () => {
    const now = 1479427200000;
    const spy = jest.spyOn(Date, "now").mockImplementation(() => now);

    expect(reducer(undefined, generateCodeSuccess())).toMatchObject({
      isGenerating: false,
      isGenerated: true,
      isPending: false,
      generatedAt: now
    });
    spy.mockRestore();
  });

  it("should handle VERIFY_CODE_SUCCESS action type", () => {
    expect(reducer(undefined, verifyCodeSuccess())).toMatchObject({
      isGenerating: false,
      isGenerated: false,
      isVerified: true,
      verificationError: false,
      isPending: false,
      attempts: 0
    });
  });

  it("should handle VERIFY_CODE_FAILED action type", () => {
    expect(reducer(undefined, verifyCodeFailed())).toMatchObject({
      isVerified: false,
      verificationError: true,
      isPending: false,
      attempts: 1
    });
  });

  it("should handle VERIFY_CLEAR_ERROR action type", () => {
    expect(reducer(undefined, verifyClearError())).toMatchObject({
      verificationError: false
    });
  });
});
