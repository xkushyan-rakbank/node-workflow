import React from "react";
import { act, render } from "@testing-library/react";

import { InviteCustomer } from "../../../src/containers/AgentPages/InviteCustomer/InviteCustomer";
import { InviteForm } from "../../../src/containers/AgentPages/InviteCustomer/components/InviteForm";
import { useFormNavigation } from "../../../src/components/FormNavigation/FormNavigationProvider";
import { agentFormStepper } from "../../../src/constants";
import { NotificationsManager } from "../../../src/components/Notification";

jest.mock("../../../src/containers/AgentPages/InviteCustomer/components/InviteForm", () => {
  return { InviteForm: jest.fn().mockImplementation(() => null) };
});

jest.mock("../../../src/components/FormNavigation/FormNavigationProvider");

describe("invite customer test", () => {
  const invite = jest.fn().mockImplementation(() => Promise.resolve());
  const push = jest.fn();
  const history = { push };
  const setIsLoading = jest.fn();
  const values = "some values";
  const isLoading = "some boolean";
  const props = { setIsLoading, invite, isLoading, history };
  NotificationsManager.add = jest.fn();

  beforeEach(() => {
    useFormNavigation.mockImplementation(() => {});

    jest.clearAllMocks();
  });

  it("should call useFormNavigation", () => {
    render(<InviteCustomer {...props} />);
    expect(useFormNavigation).toBeCalledWith([false, false, agentFormStepper, true, true]);
  });

  it("should pass all props", () => {
    render(<InviteCustomer {...props} />);

    expect(InviteForm).toHaveBeenCalledTimes(1);
    expect(InviteForm.mock.calls[0][0]).toMatchObject({
      isLoading: false
    });
  });

  it("should use submitForm when invite is called(resolved)", async () => {
    render(<InviteCustomer {...props} />);

    await act(async () => {
      await InviteForm.mock.calls[0][0].submitForm(values);
    });

    expect(InviteForm).toHaveBeenCalledTimes(3);
    expect(invite).toHaveBeenCalled();
    expect(InviteForm.mock.calls[1][0].isLoading).toBe(true);
  });

  it("should use submitForm when invite is called (rejected)", async () => {
    const invite = jest.fn().mockImplementation(() => Promise.reject());

    render(<InviteCustomer {...props} invite={invite} />);

    await act(async () => {
      await InviteForm.mock.calls[0][0].submitForm(values);
    });

    expect(InviteForm).toHaveBeenCalledTimes(3);
    expect(invite).toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(0);
    expect(InviteForm.mock.calls[1][0].isLoading).toBe(true);
    expect(InviteForm.mock.calls[2][0].isLoading).toBe(false);
  });
});
