import { initialState } from "../reCaptcha";
import reCaptchaReducer from "../reCaptcha";

import { setPending, setToken, setError, setVerified } from "../../actions/reCaptcha";

describe("recaptcha reducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise initialState as the value", () => {
      const { isPending, isVerified, token, error } = initialState;

      expect(isPending).toBe(false);
      expect(isVerified).toBe(false);
      expect(token).toEqual("");
      expect(error).toBe("");
    });
  });

  describe("reCaptchaReducer", () => {
    const mockIsPending = true;
    const mockIsVerified = false;
    const mockToken = "123abcXYZ";
    const mockError = "error";
    it("setPending should update isPending", () => {
      const state = reCaptchaReducer(initialState, setPending(mockIsPending));
      const { isPending } = state;
      expect(isPending).toBe(true);
    });

    it("setToken should update token", () => {
      const state = reCaptchaReducer(initialState, setToken(mockToken));
      const { token } = state;
      expect(token).toBe(mockToken);
    });

    it("setError should update isPending, isVerified and error", () => {
      const state = reCaptchaReducer(initialState, setError(mockError));
      const { isVerified, isPending, error } = state;
      expect(isPending).toBe(false);
      expect(isVerified).toBe(false);
      expect(error).toBe(mockError);
    });

    it("setVerified should update isPending and isVerified", () => {
      const state = reCaptchaReducer(initialState, setVerified(mockIsVerified));
      const { isVerified, isPending } = state;
      expect(isPending).toBe(false);
      expect(isVerified).toBe(mockIsVerified);
    });
  });
});
