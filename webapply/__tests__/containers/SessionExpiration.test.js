import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import { SessionExpiration } from "../../src/containers/Session/SessionExpiration";
import Alert from "../../src/containers/Session/components/Alert";
import { USER_IDLE_TIMEOUT } from "../../src/constants";

const mockPush = jest.fn();
jest.mock("../../src/containers/Session/components/Alert");
jest.mock("react-router-dom", () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({}),
  useHistory: () => ({
    push: mockPush
  })
}));

describe("Session expiration tests", () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({});
  const setAccessToken = jest.fn();
  const logout = jest.fn();

  const SessionExpirationContainer = props => (
    <Provider store={store}>
      <SessionExpiration {...props} />
    </Provider>
  );

  let props = {
    authToken: "anytoken",
    isAuthenticated: true,
    setAccessToken,
    logout
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Alert.mockReturnValue(null);
  });

  it("should render session expiration popup", () => {
    render(<SessionExpirationContainer {...props} />);
  });

  it("check user without login are logout after timeout", () => {
    jest.useFakeTimers();
    render(<SessionExpirationContainer {...props} />);
    act(() => {
      jest.runAllTimers();
    });
    act(() => Alert.mock.calls[0][0].handleConfirm());
  });

  it("check is extending session on user keep me signed in btn click", () => {
    jest.useFakeTimers();
    render(<SessionExpirationContainer {...props} />);
    act(() => {
      jest.advanceTimersByTime(USER_IDLE_TIMEOUT);
    });
    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(setInterval).toHaveBeenCalledTimes(1);
    act(() => Alert.mock.calls[0][0].handleConfirm());
    jest.runOnlyPendingTimers();
    act(() => Alert.mock.calls[0][0].handleConfirm());
  });

  it("check expiry interval is starting", () => {
    props = {
      authToken: "anytoken",
      isAuthenticated: false,
      setAccessToken,
      logout
    };
    jest.useFakeTimers();
    render(<SessionExpirationContainer {...props} />);
    act(() => {
      jest.runAllTimers();
    });
  });

  it("auth token undefined", () => {
    props = {
      isAuthenticated: false,
      setAccessToken,
      logout
    };
    jest.useFakeTimers();
    render(<SessionExpirationContainer {...props} />);
    act(() => {
      jest.runAllTimers();
    });
  });
});
