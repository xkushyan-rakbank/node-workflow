import { renderHook } from "@testing-library/react-hooks";
import { useParams } from "react-router-dom";
import { useAccountTypeByPathname } from "../../src/utils/useAccountTypeByPathname";
import { accountNames } from "../../src/constants";

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn()
}));

jest.mock("react-router-dom", () => ({
  useParams: jest.fn()
}));

describe("useAccountTypeByPathname test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return rakstarter account type info", () => {
    useParams.mockImplementation(() => ({ accountType: "rakstarter" }));
    const { result } = renderHook(() => useAccountTypeByPathname());

    const expectedValue = {
      accountType: accountNames.starter,
      isIslamicBanking: false
    };

    expect(result.current).toEqual(expectedValue);
  });

  it("should return elite islamic account type info", () => {
    useParams.mockImplementation(() => ({ accountType: "business-elite-islamic" }));
    const { result } = renderHook(() => useAccountTypeByPathname());

    const expectedValue = {
      accountType: accountNames.elite,
      isIslamicBanking: true
    };

    expect(result.current).toEqual(expectedValue);
  });
});
