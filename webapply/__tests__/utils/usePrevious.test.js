import { renderHook } from "@testing-library/react-hooks";
import { usePrevious } from "../../src/utils/usePrevious";

describe("usePrevious tests", () => {
  it("should return undefined on first call", () => {
    const value = "test";
    const { result } = renderHook(() => usePrevious(value));
    expect(result.current).toBeUndefined();
  });

  it("should return previous value when value has been changed", () => {
    const prevValue = "prev";
    const nextValue = "next";

    const { result, rerender } = renderHook(() => usePrevious(prevValue));

    rerender(nextValue);

    expect(result.current).toEqual(prevValue);
  });
});
