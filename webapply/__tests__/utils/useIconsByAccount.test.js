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

  it("should call getIsIslamicBanking and getAccountType mock", () => {
    it("should getIsIslamicBanking return true", () => {
      getIsIslamicBanking.mockReturnValue(true);

      it("should return eliteIslamicIconsSet", () => {
        getAccountType.mockReturnValue(accountNames.elite);

        const { result } = renderHook(() => useIconsByAccount());

        expect(useIconsByAccount(result.current)).toBe("eliteIslamicIconsSet");
      });

      it("should return eliteIslamicIconsSet", () => {
        getAccountType.mockReturnValue(accountNames.starter);

        const { result } = renderHook(() => useIconsByAccount());

        expect(useIconsByAccount(result.current)).toBe("islamicIconsSet");
      });
    });

    it("should getIsIslamicBanking return false", () => {
      getIsIslamicBanking.mockReturnValue(false);

      it("should return conventionalIconsSet", () => {
        getAccountType.mockReturnValue("");

        const { result } = renderHook(() => useIconsByAccount());

        expect(useIconsByAccount(result.current)).toBe("conventionalIconsSet");
      });

      it("should return eliteIconsSet", () => {
        getAccountType.mockReturnValue(accountNames.elite);

        const { result } = renderHook(() => useIconsByAccount());

        expect(useIconsByAccount(result.current)).toBe("eliteIconsSet");
      });
    });

    expect(getAccountType).toHaveBeenCalledWith(state);
    expect(getIsIslamicBanking).toHaveBeenCalledWith(state);
  });
});
