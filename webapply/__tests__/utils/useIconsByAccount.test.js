import { renderHook } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";

import { getAccountType, getIsIslamicBanking } from "../../src/store/selectors/appConfig";
import { useIconsByAccount } from "../../src/utils/useIconsByAccount/useIconByAccount";
import { accountNames } from "../../src/constants";

jest.mock("../../src/store/selectors/appConfig");
jest.mock("react-redux", () => ({
  useSelector: jest.fn(() => ({}))
}));

jest.mock("../../src/utils/useIconsByAccount/constants", () => ({
  __esModule: true,
  islamicIconsSet: "islamicIconsSet",
  conventionalIconsSet: "conventionalIconsSet",
  eliteIconsSet: "eliteIconsSet",
  eliteIslamicIconsSet: "eliteIslamicIconsSet"
}));

describe("useIconsByAccount test", () => {
  const state = "some state";

  afterEach(() => {
    jest.clearAllMocks();
    useSelector.mockRestore();
  });

  beforeEach(() => {
    useSelector.mockImplementation(cb => cb(state));
  });

  it("should return eliteIslamicIconsSet when account type is elite", () => {
    getIsIslamicBanking.mockReturnValue(true);
    getAccountType.mockReturnValue(accountNames.elite);

    const { result } = renderHook(() => useIconsByAccount());

    expect(useIconsByAccount(result.current)).toBe("eliteIslamicIconsSet");
    expect(getAccountType).toHaveBeenCalledWith(state);
    expect(getIsIslamicBanking).toHaveBeenCalledWith(state);
  });

  it("should return eliteIslamicIconsSet when account type is starter", () => {
    getIsIslamicBanking.mockReturnValue(true);
    getAccountType.mockReturnValue(accountNames.starter);

    const { result } = renderHook(() => useIconsByAccount());

    expect(useIconsByAccount(result.current)).toBe("islamicIconsSet");
    expect(getAccountType).toHaveBeenCalledWith(state);
    expect(getIsIslamicBanking).toHaveBeenCalledWith(state);
  });

  it("should return conventionalIconsSet when account type is empty", () => {
    getIsIslamicBanking.mockReturnValue(false);
    getAccountType.mockReturnValue("");

    const { result } = renderHook(() => useIconsByAccount());

    expect(useIconsByAccount(result.current)).toBe("conventionalIconsSet");
    expect(getAccountType).toHaveBeenCalledWith(state);
    expect(getIsIslamicBanking).toHaveBeenCalledWith(state);
  });

  it("should return eliteIconsSet when account type is elite", () => {
    getIsIslamicBanking.mockReturnValue(false);
    getAccountType.mockReturnValue(accountNames.elite);

    const { result } = renderHook(() => useIconsByAccount());

    expect(useIconsByAccount(result.current)).toBe("eliteIconsSet");
    expect(getAccountType).toHaveBeenCalledWith(state);
    expect(getIsIslamicBanking).toHaveBeenCalledWith(state);
  });
});
