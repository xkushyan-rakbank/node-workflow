import React from "react";
import { render, act } from "@testing-library/react";
import {ComeBackLoginComponent} from "../../src/containers/ComeBackLogin/components/ComeBackLogin";
import {ComeBackLoginContainer} from "../../src/containers/ComeBackLogin/ComeBackLogin";
import {useTrackingHistory} from "../../src/utils/useTrackingHistory";
import {FormNavigationContext, useFormNavigation} from "../../src/components/FormNavigation/FormNavigationProvider";

jest.mock("../../src/utils/useTrackingHistory");
jest.mock("../../src/containers/ComeBackLogin/components/ComeBackLogin");
jest.mock("../../src/store/actions/reCaptcha");
jest.mock("../../src/components/FormNavigation/FormNavigationProvider");

describe("ComeBackLogin test", () => {
  const generateOtpCode = jest.fn();
  const isOtpGenerated = false;
  const setToken = jest.fn();
  const resetProspect = jest.fn();
  const recaptchaToken = "some token";
  const submitForm = jest.fn().mockImplementation(() => {
    return {};
  });
  const handleReCaptchaVerify = jest.fn();
  const handleVerifiedFailed = jest.fn();
  const isRecaptchaEnable = false;
  const isGenerating = false;
  const isConfigLoading = false;
  const contextValue = [true, false];

  const props = {
    generateOtpCode,
    setToken,
    resetProspect,
    recaptchaToken,
    isOtpGenerated,
    isRecaptchaEnable,
    isGenerating,
    isConfigLoading,
    submitForm
  };

  const ContainerWithContext = props =>
    <FormNavigationContext.Provider value={contextValue}>
      <ComeBackLoginContainer {...props} />
    </FormNavigationContext.Provider>;

  beforeEach(() => {
    useFormNavigation.mockImplementation(() => {});
    useTrackingHistory.mockImplementation(()=>({}));
    ComeBackLoginComponent.mockImplementation(() => null);

    jest.clearAllMocks();
  });


  it("should use useFormNavigation", () => {
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
      isConfigLoading,
    })
  });

});


