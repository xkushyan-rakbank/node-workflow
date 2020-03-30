import { renderHook } from "@testing-library/react-hooks";
import { useTrackingHistory } from "../../src/utils/useTrackingHistory";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(fn => fn()),
  useDispatch: () => jest.fn()
}));

describe("useTrackingHistory tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return function", () => {
    const { result } = renderHook(() => useTrackingHistory());
    expect(typeof result.current).toBe("function");
  });

  it.todo("should change path");
});
