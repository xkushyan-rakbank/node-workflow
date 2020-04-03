import { renderHook, act } from "@testing-library/react-hooks";
import { fireEvent } from "@testing-library/react";

import { useWindowSize } from "../../src/utils/useWindowSize";

describe("useWindowSize test", () => {
  it("should return new size when resize event triggered", () => {
    const expectSize = [500, 500];
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      window.innerWidth = 500;
      window.innerHeight = 500;
      fireEvent(window, new Event("resize"));
    });

    expect(result.current).toEqual(expectSize);
  });
});
