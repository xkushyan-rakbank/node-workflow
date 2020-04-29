import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { OTPGeneratedProtectedRoute } from "../../../src/containers/Routers";
import { ProtectedRoute } from "../../../src/containers/Routers/components/ProtectedRoute";
import { RedirectRoute } from "../../../src/containers/Routers/components/RedirectRoute";
import routes from "../../../src/routes";
import { isOtpGenerated } from "../../../src/store/selectors/otp";

jest.mock("../../../src/store/selectors/otp");
jest.mock("../../../src/containers/Routers/components/ProtectedRoute");
jest.mock("../../../src/containers/Routers/components/RedirectRoute");

describe("OTPGeneratedProtectedRoute test", () => {
  const state = "some state";
  const store = configureStore([])(state);
  const TestComponent = props => (
    <Provider store={store}>
      <OTPGeneratedProtectedRoute {...props} />
    </Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    ProtectedRoute.mockReturnValue(null);
    RedirectRoute.mockReturnValue(null);
  });

  it("should render route when otp is not generated", () => {
    isOtpGenerated.mockReturnValue(true);

    render(<TestComponent />);

    expect(isOtpGenerated).toHaveBeenCalledWith(state);
    expect(ProtectedRoute).toHaveBeenCalled();
  });

  it("should redirect to comeBackLogin page when OTP is not generated", () => {
    isOtpGenerated.mockReturnValue(false);

    render(<TestComponent />);

    expect(isOtpGenerated).toHaveBeenCalledWith(state);
    expect(RedirectRoute.mock.calls[0][0]).toEqual({ to: routes.comeBackLogin });
  });
});
