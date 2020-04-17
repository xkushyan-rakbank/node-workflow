import React from "react";
import { render, act } from "@testing-library/react";

import { OtpContainer, INITIAL_VALUES } from "../../src/containers/Otp/Otp";
import { Form } from "../../src/containers/Otp/components/Form";
import { useTrackingHistory } from "../../src/utils/useTrackingHistory";

jest.mock("../../src/containers/Otp/components/Form");
jest.mock("../../src/utils/useTrackingHistory");

describe("Otp test", () => {
  const pushHistory = jest.fn();
  const generateOtpCode = jest.fn();
  const verifyOtp = jest.fn();
  const verifyClearError = jest.fn();
  const resetFocus = jest.fn();

  const otp = {
    attempts: 0,
    verificationError: false,
    isVerified: false,
    isPending: false,
    isGenerating: false
  };

  const applicantInfo = {
    countryCode: "some code"
  };

  const redirectRoute = "some route";
  const classes = "some object";

  const baseProps = {
    generateOtpCode,
    verifyOtp,
    verifyClearError,
    applicantInfo,
    redirectRoute,
    classes,
    otp
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Form.mockReturnValue(null);
    useTrackingHistory.mockReturnValue(pushHistory);
  });

  it("should render and passed props", () => {
    const props = { ...baseProps };
    render(<OtpContainer {...props} />);
    expect(Form).toHaveBeenCalled();
    expect(Form.mock.calls[0][0]).toMatchObject({
      classes,
      formRef: { current: null },
      values: INITIAL_VALUES,
      isPending: false,
      isSubmitButtonDisable: true,
      hasUAECode: false,
      hasMaxAttemptsError: false,
      hasVerifyError: false
    });
  });

  it("should submit form and values were passed", () => {
    const props = { ...baseProps };
    render(<OtpContainer {...props} />);
    expect(Form).toHaveBeenCalled();

    act(() => {
      Form.mock.calls[0][0].onSubmit();
    });

    expect(verifyOtp).toHaveBeenCalled();
  });
});
