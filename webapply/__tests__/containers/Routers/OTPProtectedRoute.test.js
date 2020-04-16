import React from "react";

import { OTPProtectedRoute } from "../../../src/containers/Routers/OTPProtectedRoute";
import routes from "../../../src/routes";
import { isOtpVerified, isOtpGenerated } from "../../../src/store/selectors/otp";
import { renderWithProviders } from "../../../src/testUtils";

jest.mock("../../../src/store/selectors/otp");

describe("OTPProtectedRoute test", () => {
  const routeRender = jest.fn().mockImplementation(() => null);

  const baseProps = { render: routeRender };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render route when component passed and auth checks were passed", () => {
    isOtpVerified.mockReturnValue(true);
    isOtpGenerated.mockReturnValue(true);
    const Component = jest.fn().mockImplementation(() => null);
    const props = {
      ...baseProps,
      component: Component
    };

    renderWithProviders(<OTPProtectedRoute {...props} />);

    expect(Component).toHaveBeenCalledTimes(1);
  });

  it("should render route when render function passed instead component", () => {
    isOtpVerified.mockReturnValue(true);
    isOtpGenerated.mockReturnValue(false);
    const props = { ...baseProps };

    const { history } = renderWithProviders(<OTPProtectedRoute {...props} />);

    expect(history.location.pathname).toMatch("/");
    expect(routeRender).toHaveBeenCalled();
  });

  it("should redirect to comeBackLogin page when OTP checks weren't passed", () => {
    isOtpVerified.mockReturnValue(false);
    isOtpGenerated.mockReturnValue(false);
    const props = { ...baseProps };

    const { history } = renderWithProviders(<OTPProtectedRoute {...props} />);

    expect(history.location.pathname).toMatch(routes.comeBackLogin);
  });
});
