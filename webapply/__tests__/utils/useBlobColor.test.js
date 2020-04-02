import { renderHook } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import set from "lodash/set";

import { useBlobColor } from "../../src/utils/useBlobColor/useBlobColor";
import { STANDART, ELITE, ISLAMIC, NONE } from "../../src/utils/useBlobColor/constants";
import { accountNames } from "../../src/constants";
import routes from "../../src/routes";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockImplementation(() => ({ pathname: "/" }))
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(() => ({}))
}));

describe("useBlobColor test", () => {
  afterEach(() => {
    jest.clearAllMocks();
    useSelector.mockRestore();
  });

  it("should return NONE color when isHideSideBar is true", () => {
    const { result } = renderHook(() => useBlobColor(true));
    expect(result.current).toEqual(NONE);
  });

  it("should return ELITE color", () => {
    const state = set({}, "appConfig.prospect.applicationInfo.accountType", accountNames.elite);
    useSelector.mockImplementation(cb => cb(state));
    const { result } = renderHook(() => useBlobColor());
    expect(result.current).toEqual(ELITE);
  });

  it("should return ISLAMIC color", () => {
    const state = set({}, "appConfig.prospect.applicationInfo.islamicBanking", true);
    useSelector.mockImplementation(cb => cb(state));
    const { result } = renderHook(() => useBlobColor());
    expect(result.current).toEqual(ISLAMIC);
  });

  it("should return STANDART color when URL has specific path or accountType not elite and islamic", () => {
    const { result, rerender } = renderHook(() => useBlobColor());
    expect(result.current).toEqual(STANDART);

    useLocation.mockImplementation(() => ({ pathname: routes.accountsComparison }));
    rerender();
    expect(result.current).toEqual(STANDART);
  });
});
