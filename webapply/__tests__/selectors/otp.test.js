import {
  getOtp,
  getIsGenerating,
  isOtpGenerated,
  isOtpVerified
} from "../../src/store/selectors/otp";

describe("otp test", () => {
  const isGenerated = false;
  const isVerified = false;
  const isGenerating = false;
  const otp = {
    isGenerated,
    isVerified,
    isGenerating
  };
  const state = { otp };

  it("Should return otp", () => {
    expect(getOtp(state)).toEqual(otp);
  });

  it("should return value of isGenerated", () => {
    expect(isOtpGenerated(state)).toEqual(isGenerated);
  });

  it("should return value of isGenerating", () => {
    expect(getIsGenerating(state)).toEqual(isGenerating);
  });

  it("should return value of isVerified", () => {
    expect(isOtpVerified(state)).toEqual(isVerified);
  });
});
