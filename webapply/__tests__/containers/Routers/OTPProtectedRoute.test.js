import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { OTPProtectedRoute } from "../../../src/containers/Routers/OTPProtectedRoute";
import { ProtectedRoute, RedirectRoute } from "../../../src/components/Routes";
import routes from "../../../src/routes";
import { isOtpVerified, isOtpGenerated } from "../../../src/store/selectors/otp";

jest.mock("../../../src/store/selectors/otp");
jest.mock("../../../src/components/Routes");

describe("OTPProtectedRoute test", () => {
  const state = "some state";
  const store = configureStore([])(state);
  const TestComponent = props => (
    <Provider store={store}>
      <OTPProtectedRoute {...props} />
    </Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    ProtectedRoute.mockReturnValue(null);
    RedirectRoute.mockReturnValue(null);
  });

  it("should render route when auth checks were passed", () => {
    isOtpVerified.mockReturnValue(true);
    isOtpGenerated.mockReturnValue(true);

    render(<TestComponent />);

    expect(ProtectedRoute).toHaveBeenCalled();
    expect(isOtpVerified).toHaveBeenCalledWith(state);
    expect(isOtpGenerated).toHaveBeenCalledWith(state);
  });

  it("should render route when OTP disabled and token was generated", () => {
    isOtpVerified.mockReturnValue(false);
    isOtpGenerated.mockReturnValue(true);
    process.env.REACT_APP_OTP_ENABLE = "N";

    render(<TestComponent />);

    expect(ProtectedRoute).toHaveBeenCalled();
    expect(isOtpVerified).toHaveBeenCalledWith(state);
    expect(isOtpGenerated).toHaveBeenCalledWith(state);
    process.env.REACT_APP_OTP_ENABLE = "Y";
  });

  it("should redirect to comeBackLogin page when OTP checks weren't passed", () => {
    isOtpVerified.mockReturnValue(false);
    isOtpGenerated.mockReturnValue(false);

    render(<TestComponent />);

    expect(RedirectRoute.mock.calls[0][0]).toEqual({ to: routes.comeBackLogin });
    expect(isOtpVerified).toHaveBeenCalledWith(state);
    expect(isOtpGenerated).toHaveBeenCalledWith(state);
  });
});
