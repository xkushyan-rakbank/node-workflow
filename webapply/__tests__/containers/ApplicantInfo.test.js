import React from "react";
import { render, act } from "@testing-library/react";

import { ApplicantInfoContainer } from "../../src/containers/ApplicantInfo/ApplicantInfo";
import { ApplicantInfoComponent } from "../../src/containers/ApplicantInfo/components/ApplicantInfo";
import { useLayoutParams } from "../../src/containers/FormLayout";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import { useTrackingHistory } from "../../src/utils/useTrackingHistory";
import { accountNames } from "../../src/constants";
import routes from "../../src/routes";

jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/containers/ApplicantInfo/components/ApplicantInfo", () => {
  return { ApplicantInfoComponent: jest.fn().mockImplementation(() => null) };
});
jest.mock("../../src/containers/FormLayout");
jest.mock("../../src/utils/useTrackingHistory");

describe("ApplicantInfo container tests", () => {
  const submit = jest.fn().mockImplementation(() => Promise.resolve());
  const receiveAppConfig = jest.fn();
  const setToken = jest.fn();
  const resetScreeningError = jest.fn();
  const pushHistory = jest.fn();

  const reCaptchaToken = "some token";
  const reCaptchaSiteKey = "some key";
  const isRecaptchaEnable = true;
  const isConfigLoading = true;
  const accountType = accountNames.starter;
  const isIslamicBanking = true;

  const props = {
    submit,
    receiveAppConfig,
    setToken,
    reCaptchaToken,
    reCaptchaSiteKey,
    isRecaptchaEnable,
    resetScreeningError,
    isConfigLoading,
    accountType,
    isIslamicBanking
  };

  const values = "some values";

  beforeEach(() => {
    useLayoutParams.mockImplementation(() => {});
    useFormNavigation.mockImplementation(() => {});
    useTrackingHistory.mockReturnValue(pushHistory);

    jest.clearAllMocks();
  });

  it("should dispatch receiveAppConfig on mount", () => {
    render(<ApplicantInfoContainer {...props} />);

    expect(ApplicantInfoComponent).toHaveBeenCalledTimes(1);
    expect(receiveAppConfig).toHaveBeenCalled();
  });

  it("should dispatch resetScreeningError on mount", () => {
    render(<ApplicantInfoContainer {...props} />);

    expect(ApplicantInfoComponent).toHaveBeenCalledTimes(1);
    expect(resetScreeningError).toHaveBeenCalled();
  });

  it("should pass all props", () => {
    render(<ApplicantInfoContainer {...props} />);

    expect(ApplicantInfoComponent).toHaveBeenCalledTimes(1);
    expect(ApplicantInfoComponent.mock.calls[0][0]).toMatchObject({
      isConfigLoading,
      reCaptchaToken,
      reCaptchaSiteKey,
      isIslamicBanking,
      accountType,
      isLoading: false
    });
  });

  it("should use onSubmit when submit is called(resolved)", async () => {
    render(<ApplicantInfoContainer {...props} submit={submit} />);

    await act(async () => {
      await ApplicantInfoComponent.mock.calls[0][0].onSubmit(values);
    });

    expect(ApplicantInfoComponent).toHaveBeenCalledTimes(2);
    expect(submit).toHaveBeenCalled();
    expect(pushHistory).toHaveBeenCalled();
    expect(ApplicantInfoComponent.mock.calls[1][0].isLoading).toBe(true);
    expect(pushHistory.mock.calls[0]).toEqual([routes.verifyOtp, true]);
  });

  it("should use onSubmit when submit is called (rejected)", async () => {
    const submit = jest.fn().mockImplementation(() => Promise.reject());
    render(<ApplicantInfoContainer {...props} submit={submit} />);

    await act(async () => {
      await ApplicantInfoComponent.mock.calls[0][0].onSubmit(values);
    });

    expect(ApplicantInfoComponent).toHaveBeenCalledTimes(3);
    expect(submit).toHaveBeenCalled();
    expect(pushHistory).toHaveBeenCalledTimes(0);
    expect(ApplicantInfoComponent.mock.calls[1][0].isLoading).toBe(true);
    expect(ApplicantInfoComponent.mock.calls[2][0].isLoading).toBe(false);
  });

  it("should handle handleReCaptchaVerify", () => {
    const token = "some token";
    render(<ApplicantInfoContainer {...props} />);

    act(() => {
      ApplicantInfoComponent.mock.calls[0][0].handleReCaptchaVerify(token);
    });

    expect(ApplicantInfoComponent).toHaveBeenCalledTimes(1);
    expect(setToken.mock.calls[0]).toEqual([token]);
  });

  it("should handle handleVerifiedFailed", () => {
    render(<ApplicantInfoContainer {...props} />);

    act(() => {
      ApplicantInfoComponent.mock.calls[0][0].handleVerifiedFailed();
    });

    expect(ApplicantInfoComponent).toHaveBeenCalledTimes(1);
    expect(setToken.mock.calls[0]).toEqual([null]);
  });
});
