import React from "react";
import { Provider } from "react-redux";
import { render, act } from "@testing-library/react";
import configureStore from "redux-mock-store";

import { Otp } from "../../src/containers/Otp";
import { Form } from "../../src/containers/Otp/components/Form";
import { verifyOtp, verifyClearError, generateOtpCode } from "../../src/store/actions/otp";
import { getOtp } from "../../src/store/selectors/otp";
import { getApplicantInfo } from "../../src/store/selectors/appConfig";
import { useTrackingHistory } from "../../src/utils/useTrackingHistory";

jest.mock("../../src/containers/Otp/components/Form");
jest.mock("../../src/store/selectors/otp");
jest.mock("../../src/store/selectors/appConfig");
jest.mock("../../src/utils/useTrackingHistory");
jest.mock("../../src/store/actions/otp");

describe("MyApplications test", () => {
  const state = "some state";
  const store = configureStore([])(state);
  const TestComponent = () => (
    <Provider store={store}>
      <Otp redirectRoute={redirectRoute} />
    </Provider>
  );

  const redirectRoute = "some route";
  const attempts = "some attemps";
  let verificationError;
  let isVerified;
  let isGenerating;
  const isPending = "some bool";
  const applicantInfo = "some applicant info";
  const pushHistory = jest.fn();
  const verifyOtpAction = { type: "verify otp" };
  const verifyClearErrorAction = { type: "clear errors" };

  beforeEach(() => {
    verificationError = null;
    isVerified = false;
    isGenerating = "some bool";

    jest.clearAllMocks();
    store.clearActions();
    Form.mockReturnValue(null);
    getOtp.mockReturnValue({ attempts, verificationError, isVerified, isPending, isGenerating });
    getApplicantInfo.mockReturnValue(applicantInfo);
    useTrackingHistory.mockReturnValue(pushHistory);
    verifyOtp.mockReturnValue(verifyOtpAction);
    verifyClearError.mockReturnValue(verifyClearErrorAction);
    generateOtpCode.mockReturnValue({ type: "generate otp" });
  });

  it("should render component", () => {
    render(<TestComponent />);

    expect(Form.mock.calls[0][0]).toMatchObject({
      applicantInfo,
      attempts,
      loginAttempt: 0,
      isPending,
      isGenerating,
      verificationError,
      otpRef: { current: null },
      code: ["", "", "", "", "", ""]
    });
    expect(getOtp).toBeCalledWith(state);
    expect(getApplicantInfo).toBeCalledWith(state);
    expect(useTrackingHistory).toBeCalled();
  });

  it("should replace location when otp was verified", () => {
    isVerified = true;
    getOtp.mockReturnValue({ attempts, verificationError, isVerified, isPending, isGenerating });

    render(<TestComponent />);

    expect(Form).toBeCalled();
    expect(getOtp).toBeCalledWith(state);
    expect(getApplicantInfo).toBeCalledWith(state);
    expect(useTrackingHistory).toBeCalled();
    expect(pushHistory).toBeCalledWith(redirectRoute, true);
  });

  it("should reset focus when verification failed", () => {
    verificationError = "some error";
    const resetFocus = jest.fn();

    getOtp.mockReturnValue({ attempts, verificationError, isVerified, isPending, isGenerating });
    Form.mockImplementation(({ otpRef }) => {
      otpRef.current = { resetFocus };

      return null;
    });

    render(<TestComponent />);

    expect(Form).toBeCalled();
    expect(getOtp).toBeCalledWith(state);
    expect(getApplicantInfo).toBeCalledWith(state);
    expect(useTrackingHistory).toBeCalled();
    expect(resetFocus).toBeCalled();
  });

  it("should handle action `verifyOtp` when form was submited", () => {
    render(<TestComponent />);

    expect(Form).toBeCalled();
    expect(getOtp).toBeCalledWith(state);
    expect(getApplicantInfo).toBeCalledWith(state);
    expect(useTrackingHistory).toBeCalled();

    act(() => {
      Form.mock.calls[0][0].submitForm();
    });

    expect(verifyOtp).toBeCalledWith("");
    expect(store.getActions()).toEqual([verifyOtpAction]);
  });

  it("should handle `generateOtpCode` action and increase `loginAttempt` prop when otp is generated", () => {
    const resetFocus = jest.fn();
    isGenerating = false;
    getOtp.mockReturnValue({ attempts, verificationError, isVerified, isPending, isGenerating });
    Form.mockImplementation(({ otpRef }) => {
      otpRef.current = { resetFocus };

      return null;
    });

    render(<TestComponent />);

    expect(Form).toBeCalled();
    expect(getOtp).toBeCalledWith(state);
    expect(getApplicantInfo).toBeCalledWith(state);
    expect(useTrackingHistory).toBeCalled();

    act(() => {
      Form.mock.calls[0][0].handleSendNewCodeLinkClick();
    });
    expect(resetFocus).toBeCalled();
    expect(Form.mock.calls[1][0].loginAttempt).toBe(1);
  });

  it("should do nothing when otp is not generated", () => {
    const resetFocus = jest.fn();
    getOtp.mockReturnValue({ attempts, verificationError, isVerified, isPending, isGenerating });
    Form.mockImplementation(({ otpRef }) => {
      otpRef.current = { resetFocus };

      return null;
    });

    render(<TestComponent />);

    expect(Form).toBeCalled();
    expect(getOtp).toBeCalledWith(state);
    expect(getApplicantInfo).toBeCalledWith(state);
    expect(useTrackingHistory).toBeCalled();

    act(() => {
      Form.mock.calls[0][0].handleSendNewCodeLinkClick();
    });
    expect(resetFocus).toBeCalled();
    expect(Form.mock.calls[1][0].loginAttempt).toBe(0);
  });
});
