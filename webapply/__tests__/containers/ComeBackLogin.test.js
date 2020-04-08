import React from "react";
import { render, act } from "@testing-library/react";
import {ComeBackLoginComponent} from "../../src/containers/ComeBackLogin/components/ComeBackLogin";
import {ComeBackLoginContainer} from "../../src/containers/ComeBackLogin/ComeBackLogin";
import {useTrackingHistory} from "../../src/utils/useTrackingHistory";
import {FormNavigationContext, useFormNavigation} from "../../src/components/FormNavigation/FormNavigationProvider";
import routes from "../../src/routes";

jest.mock("../../src/utils/useTrackingHistory");
jest.mock("../../src/containers/ComeBackLogin/components/ComeBackLogin");
jest.mock("../../src/store/actions/reCaptcha");
jest.mock("../../src/components/FormNavigation/FormNavigationProvider");

describe("ComeBackLogin test", () => {
  const generateOtpCode = jest.fn();
  const isOtpGenerated = true;
  const setToken = jest.fn();
  const path = routes.MyApplications;
  const resetProspect = jest.fn();
  const recaptchaToken = "some token";
  const isRecaptchaEnable = true;
  const isGenerating = false;
  const isConfigLoading = false;
  const contextValue = [true, false];

  const values = {
    value: 1,
    recaptchaToken
  };
  const props = {
    generateOtpCode,
    setToken,
    resetProspect,
    recaptchaToken,
    isOtpGenerated,
    isRecaptchaEnable,
    isGenerating,
    isConfigLoading,
  };
  const ContainerWithContext = props =>
    <FormNavigationContext.Provider value={contextValue}>
      <ComeBackLoginContainer {...props} />
    </FormNavigationContext.Provider>;

  beforeEach(() => {
    useFormNavigation.mockImplementation(() => {});
    useTrackingHistory.mockImplementation(() => {});
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

  it("should submitForm", () => {
    render(<ContainerWithContext {...props} />);

    act(() => {ComeBackLoginComponent.mock.calls[0][0].submitForm(values)});
    expect(generateOtpCode.mock.calls[0][0]).toEqual({...values})
  });

  it("should handleReCaptchaVerify", () => {
    render(<ContainerWithContext {...props} />);

    act(() => {ComeBackLoginComponent.mock.calls[0][0].handleReCaptchaVerify(recaptchaToken)});
    expect(setToken.mock.calls[0][0]).toEqual(recaptchaToken)
  });

  it("should handleVerifiedFailed", () => {
    render(<ContainerWithContext {...props} />);

    act(() => {ComeBackLoginComponent.mock.calls[0][0].handleVerifiedFailed(null)});
    expect(setToken.mock.calls[0][0]).toEqual(null)
  });

  it("should run pushHistory", () => {
    useTrackingHistory.mockReturnValue({path});
    // const pushHistory = useTrackingHistory();
    // console.log(pushHistory);
    // pushHistory.mockReturnValue(null);
    // useTrackingHistory.mockReturnValue(path);
    render(<ContainerWithContext {...props} />);
    // act(() => {ComeBackLoginComponent.mock.calls[0][0].});


    expect(pushHistory.mock.calls[0]).toEqual([]);
  });


});


