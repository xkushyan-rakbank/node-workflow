import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { AgentProtectedRoute } from "../../../src/containers/Routers/AgentProtectedRoute";
import { ProtectedRoute } from "../../../src/containers/Routers/components/ProtectedRoute";
import { RedirectRoute } from "../../../src/containers/Routers/components/RedirectRoute";
import routes from "../../../src/routes";
import { checkLoginStatus } from "../../../src/store/selectors/loginSelector";
import { getAuthToken } from "../../../src/store/selectors/appConfig";

jest.mock("../../../src/store/selectors/loginSelector");
jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/containers/Routers/components/ProtectedRoute");
jest.mock("../../../src/containers/Routers/components/RedirectRoute");

describe("AgentProtectedRoute test", () => {
  const state = "some state";
  const store = configureStore([])(state);
  const TestComponent = props => (
    <Provider store={store}>
      <AgentProtectedRoute {...props} />
    </Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    ProtectedRoute.mockReturnValue(null);
    RedirectRoute.mockReturnValue(null);
  });

  it("should render route when auth checks were passed", () => {
    checkLoginStatus.mockReturnValue(true);
    getAuthToken.mockReturnValue(true);

    render(<TestComponent />);

    expect(ProtectedRoute).toHaveBeenCalled();
    expect(checkLoginStatus).toHaveBeenCalledWith(state);
    expect(getAuthToken).toHaveBeenCalledWith(state);
  });

  it("should redirect to login page when auth checks weren't passed", () => {
    checkLoginStatus.mockReturnValue(false);
    getAuthToken.mockReturnValue(false);

    render(<TestComponent />);

    expect(RedirectRoute.mock.calls[0][0]).toEqual({ to: routes.login });
    expect(checkLoginStatus).toHaveBeenCalledWith(state);
    expect(getAuthToken).toHaveBeenCalledWith(state);
  });
});
