import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { ProspectProtectedRoute } from "../../../src/containers/Routers";
import { ProtectedRoute, RedirectRoute } from "../../../src/components/Routes";
import routes from "../../../src/routes";
import { getProspectId } from "../../../src/store/selectors/appConfig";
import { checkLoginStatus } from "../../../src/store/selectors/loginSelector";

jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/store/selectors/loginSelector");
jest.mock("../../../src/components/Routes");

describe("ProspectProtectedRoute test", () => {
  const state = "some state";
  const store = configureStore([])(state);
  const TestComponent = props => (
    <Provider store={store}>
      <ProspectProtectedRoute {...props} />
    </Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    ProtectedRoute.mockReturnValue(null);
    RedirectRoute.mockReturnValue(null);
  });

  it("should render route when auth checks were passed", () => {
    getProspectId.mockReturnValue(true);
    checkLoginStatus.mockReturnValue(true);

    render(<TestComponent />);

    expect(ProtectedRoute).toHaveBeenCalled();
    expect(getProspectId).toHaveBeenCalledWith(state);
    expect(checkLoginStatus).toHaveBeenCalledWith(state);
  });

  it("should redirect to comebackLogin page when user is customer", () => {
    getProspectId.mockReturnValue(null);
    checkLoginStatus.mockReturnValue(false);

    render(<TestComponent />);

    expect(RedirectRoute.mock.calls[0][0]).toEqual({ to: routes.comeBackLogin });
    expect(getProspectId).toHaveBeenCalledWith(state);
    expect(checkLoginStatus).toHaveBeenCalledWith(state);
  });

  it("should redirect to login page when user is agent", () => {
    getProspectId.mockReturnValue(null);
    checkLoginStatus.mockReturnValue(true);

    render(<TestComponent />);

    expect(RedirectRoute.mock.calls[0][0]).toEqual({ to: routes.login });
    expect(getProspectId).toHaveBeenCalledWith(state);
    expect(checkLoginStatus).toHaveBeenCalledWith(state);
  });
});
