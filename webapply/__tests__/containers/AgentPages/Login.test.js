import React from "react";
import { act, render } from "@testing-library/react";

import { LoginContainer } from "../../../src/containers/AgentPages/Login/Login";
import { LoginComponent } from "../../../src/containers/AgentPages/Login/components/Login";
import { useFormNavigation } from "../../../src/components/FormNavigation/FormNavigationProvider";
import routes from "../../../src/routes";

jest.mock("../../../src/containers/AgentPages/Login/components/Login", () => {
  return { LoginComponent: jest.fn().mockImplementation(() => null) };
});
jest.mock("../../../src/components/FormNavigation/FormNavigationProvider");

describe("Login test", () => {
  const login = jest.fn().mockImplementation(() => Promise.resolve());
  const push = jest.fn();
  const history = { push };
  const setIsApplyEditApplication = jest.fn();
  const setIsLoading = jest.fn();
  const values = "some values";
  const isLoading = "some boolean";
  const props = { setIsApplyEditApplication, setIsLoading, login, isLoading, history };

  beforeEach(() => {
    useFormNavigation.mockImplementation(() => {});

    jest.clearAllMocks();
  });

  it("should call useFormNavigation", () => {
    render(<LoginContainer {...props} />);
    expect(useFormNavigation).toBeCalledWith([false, false]);
  });

  it("should pass all props", () => {
    render(<LoginContainer {...props} />);

    expect(LoginComponent).toHaveBeenCalledTimes(1);
    expect(LoginComponent.mock.calls[0][0]).toMatchObject({
      isLoading: false
    });
  });

  it("should use submitForm when login is called(resolved)", async () => {
    render(<LoginContainer {...props} />);

    await act(async () => {
      await LoginComponent.mock.calls[0][0].submitForm(values);
    });

    expect(LoginComponent).toHaveBeenCalledTimes(3);
    expect(login).toHaveBeenCalled();
    expect(setIsApplyEditApplication).toHaveBeenCalledWith(true);
    expect(push).toHaveBeenCalledWith(routes.searchProspect);
    expect(LoginComponent.mock.calls[1][0].isLoading).toBe(true);
    expect(push.mock.calls[0]).toEqual([routes.searchProspect]);
  });

  it("should use submitForm when login is called (rejected)", async () => {
    const login = jest.fn().mockImplementation(() => Promise.reject());

    render(<LoginContainer {...props} login={login} />);

    await act(async () => {
      await LoginComponent.mock.calls[0][0].submitForm(values);
    });

    expect(LoginComponent).toHaveBeenCalledTimes(3);
    expect(login).toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(0);
    expect(LoginComponent.mock.calls[1][0].isLoading).toBe(true);
    expect(LoginComponent.mock.calls[2][0].isLoading).toBe(false);
  });
});
