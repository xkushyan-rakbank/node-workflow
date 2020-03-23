import reducer, { initialState } from "../../../src/store/reducers/otp";
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
import { UNMATCHED_ACTION } from "../../../__mocks__/storeMock";


describe("otp reducer test", () => {
  it("VERIFY_OTP action type", () => {
    const payload = {}
    const expectedState = {
      ...initialState,
      verificationError: false,
      isVerified: false,
      isPending: true
    };
    expect(reducer(initialState, verifyOtp(payload))).toStrictEqual(expectedState)
  })

  it("APPLICANT_INFO_FORM action type", () => {
    const payload = {}
    const expectedState = {
      ...initialState,
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
    expect(reducer(initialState, applicantInfoFormPromisify(payload))).toStrictEqual(expectedState)
  })

  it("GENERATE_OTP_CODE action type", () => {
    const payload = {
      email: "test@gmail.com",
      countryCode: "+375",
      mobileNo: "21125125"
    };
    const expectedState = {
      ...initialState,
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
    expect(reducer(initialState, generateOtpCode(payload))).toStrictEqual(expectedState);
  });

  it("SET_PENDING action type", () => {
    const payload = true;
    const expectedState = {
      ...initialState,
      isPending: payload
    };
    expect(reducer(initialState, setOtpPendingRequest(payload))).toStrictEqual(expectedState)
  })

  it("SET_GENERATING action type", () => {
    const payload = false;
    const expectedState = {
      ...initialState,
      isGenerating: payload
    };
    expect(reducer(initialState, setGeneratingCode(payload))).toStrictEqual(expectedState)
  })

  it("GENERATE_CODE_SUCCESS action type", () => {
    const payload = {};
    const expectedState = {
      ...initialState,
      ...payload,
      isGenerating: false,
      isGenerated: true,
      isPending: false,
      generatedAt: Date.now()
    }
    expect(reducer(initialState, generateCodeSuccess())).toStrictEqual(expectedState)
  })

  it("VERIFY_CODE_SUCCESS action type", () => {
    const expectedState = {
      ...initialState,
      isGenerating: false,
      isGenerated: false,
      isVerified: true,
      verificationError: false,
      isPending: false,
      attempts: 0
    }
    expect(reducer(initialState, verifyCodeSuccess())).toStrictEqual(expectedState)
  })

  it("VERIFY_CODE_FAILED action type", () => {
    const expectedState = {
      ...initialState,
      isVerified: false,
      verificationError: true,
      isPending: false,
      attempts: initialState.attempts + 1
    }
    expect(reducer(initialState, verifyCodeFailed())).toStrictEqual(expectedState)
  })

  it("VERIFY_CLEAR_ERROR action type", () => {
    const expectedState = {
      ...initialState,
      verificationError: false
    }
    expect(reducer(initialState, verifyClearError())).toStrictEqual(expectedState)
  })

  it("check default action type", () => {
    expect(reducer(undefined, UNMATCHED_ACTION)).toStrictEqual(initialState);
  });
})