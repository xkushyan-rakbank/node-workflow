import React from "react";
import { render, act } from "@testing-library/react";
import { ComeBackLoginComponent } from "../../src/containers/ComeBackLogin/components/ComeBackLogin";
import { ComeBackLoginContainer } from "../../src/containers/ComeBackLogin/ComeBackLogin";
import { useTrackingHistory } from "../../src/utils/useTrackingHistory";
import {
  FormNavigationContext,
  useFormNavigation
} from "../../src/components/FormNavigation/FormNavigationProvider";
import routes from "../../src/routes";

jest.mock("../../src/utils/useTrackingHistory");
jest.mock("../../src/containers/ComeBackLogin/components/ComeBackLogin");
jest.mock("../../src/store/actions/reCaptcha");
jest.mock("../../src/components/FormNavigation/FormNavigationProvider");

describe("ComeBackLogin test", () => {
  const generateOtpCode = jest.fn();
  const isOtpGenerated = true;
  const setToken = jest.fn();
  const path = routes.comeBackLoginVerification;
  const resetProspect = jest.fn();
  const recaptchaToken = "some token";
  const isRecaptchaEnable = true;
  const isGenerating = false;
  const isConfigLoading = false;
  const contextValue = [true, false];
  const pushHistory = jest.fn();

  const values = {
    value: 1
  };

  const props = {
    generateOtpCode,
    setToken,
    resetProspect,
    recaptchaToken,
    isOtpGenerated,
    isRecaptchaEnable,
    isGenerating,
    isConfigLoading
  };
  const ContainerWithContext = props => (
    <FormNavigationContext.Provider value={contextValue}>
      <ComeBackLoginContainer {...props} />
    </FormNavigationContext.Provider>
  );

  beforeEach(() => {
    useFormNavigation.mockImplementation(() => {});
    useTrackingHistory.mockReturnValue(pushHistory);
    ComeBackLoginComponent.mockImplementation(() => null);

    jest.clearAllMocks();
  });

  it("should resetProspect", () => {
    render(<ContainerWithContext {...props} />);
    expect(resetProspect).toHaveBeenCalled();
  });

  it("should useFormNavigation", () => {
    useFormNavigation.mockReturnValue(null);
    render(<ContainerWithContext {...props} />);

    expect(useFormNavigation.mock.calls[0][0]).toEqual([true, false]);
  });

  it("should pas props", () => {
    render(<ContainerWithContext {...props} />);

    expect(ComeBackLoginComponent.mock.calls[0][0]).toMatchObject({
      recaptchaToken,
      isRecaptchaEnable,
      isGenerating,
      isConfigLoading
    });
  });

  it("should submitForm ", () => {
    render(<ContainerWithContext {...props} />);

    act(() => {
      ComeBackLoginComponent.mock.calls[0][0].submitForm({ ...values, recaptchaToken });
    });
    expect(generateOtpCode.mock.calls[0][0]).toEqual({ ...values, recaptchaToken });
    expect(ComeBackLoginComponent.mock.calls[0][0].recaptchaToken).toBe(recaptchaToken);
  });

  it("should submit data without recaptchaToken", () => {
    render(<ContainerWithContext {...props} isRecaptchaEnable={false} />);

    act(() => {
      ComeBackLoginComponent.mock.calls[0][0].submitForm({ value: 1 });
    });
    expect(generateOtpCode.mock.calls[0][0]).toEqual(values);
  });

  it("should handleReCaptchaVerify", () => {
    render(<ContainerWithContext {...props} />);

    act(() => {
      ComeBackLoginComponent.mock.calls[0][0].handleReCaptchaVerify(recaptchaToken);
    });
    expect(setToken.mock.calls[0][0]).toEqual(recaptchaToken);
    expect(ComeBackLoginComponent).toHaveBeenCalledTimes(1);
  });

  it("should handleVerifiedFailed", () => {
    render(<ContainerWithContext {...props} />);

    act(() => {
      ComeBackLoginComponent.mock.calls[0][0].handleVerifiedFailed();
    });
    expect(ComeBackLoginComponent).toHaveBeenCalledTimes(1);
    expect(setToken.mock.calls[0][0]).toEqual(null);
  });

  it("should run pushHistory", () => {
    render(<ContainerWithContext {...props} />);

    expect(pushHistory.mock.calls[0]).toEqual([path, true]);
  });

  it("should not run pushHistory", () => {
    render(<ContainerWithContext {...props} isOtpGenerated={false} />);

    expect(pushHistory.mock.calls[0]).toBe(undefined);
  });
});
