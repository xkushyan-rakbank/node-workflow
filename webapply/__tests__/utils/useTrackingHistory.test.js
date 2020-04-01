import { renderHook } from "@testing-library/react-hooks";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTrackingHistory } from "../../src/utils/useTrackingHistory";
import { gaEventsMap } from "../../src/utils/useTrackingHistory/constants";
import routes from "../../src/routes";
import { sendGoogleAnalyticsMetrics } from "../../src/store/actions/googleAnalytics";

let dispatchedArgs = null;
let historyPushArgs = null;
let historyReplaceArgs = null;

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(path => (historyPushArgs = path)),
    replace: jest.fn(path => (historyReplaceArgs = path))
  })
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(action => (dispatchedArgs = action))
}));

describe("useTrackingHistory tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
    dispatchedArgs = null;
    historyPushArgs = null;
    historyReplaceArgs = null;
  });

  it("should return function", () => {
    const { result } = renderHook(() => useTrackingHistory());
    expect(typeof result.current).toBe("function");
  });

  it("should call history push method", () => {
    const { result } = renderHook(() => useTrackingHistory());
    result.current(routes.verifyOtp);

    expect(dispatchedArgs).toEqual(sendGoogleAnalyticsMetrics(gaEventsMap[routes.verifyOtp]));
    expect(historyPushArgs).toEqual(routes.verifyOtp);
  });

  it("should call history replace method", () => {
    const { result } = renderHook(() => useTrackingHistory());
    result.current(routes.verifyOtp, true);
    expect(dispatchedArgs).toEqual(sendGoogleAnalyticsMetrics(gaEventsMap[routes.verifyOtp]));
    expect(historyReplaceArgs).toEqual(routes.verifyOtp);
  });
});
