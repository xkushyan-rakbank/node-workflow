import { renderHook, act } from "@testing-library/react-hooks";

import { useTrackingHistory } from "../../src/utils/useTrackingHistory";
import { sendGoogleAnalyticsMetrics } from "../../src/store/actions/googleAnalytics";

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockDispatch = jest.fn();

jest.mock("react-router-dom", () => ({
  __esModule: true,
  useHistory: () => ({
    push: mockPush,
    replace: mockReplace
  })
}));
jest.mock("react-redux", () => ({
  __esModule: true,
  useDispatch: () => mockDispatch
}));
jest.mock("../../src/utils/useTrackingHistory/constants", () => ({
  gaEventsMap: {
    ["some route"]: "some event"
  }
}));

describe("useTrackingHistory tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should push\replace history", () => {
    const { result } = renderHook(() => useTrackingHistory());
    act(() => result.current("some route"));

    expect(mockDispatch).toHaveBeenCalledWith(sendGoogleAnalyticsMetrics("some event"));
    expect(mockPush).toHaveBeenCalledWith("some route");
  });

  it("should replace history", () => {
    const { result } = renderHook(() => useTrackingHistory());
    act(() => result.current("some route", true));

    expect(mockDispatch).toHaveBeenCalledWith(sendGoogleAnalyticsMetrics("some event"));
    expect(mockReplace).toHaveBeenCalledWith("some route");
  });
});
