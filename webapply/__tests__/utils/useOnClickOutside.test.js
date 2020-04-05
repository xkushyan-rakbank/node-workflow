import React, { useRef } from "react";
import { render, fireEvent } from "@testing-library/react";

import { useOnClickOutside } from "../../src/utils/useOnClickOutside";

describe("useOnClickOutside test", () => {
  it("should handle callback on click outside", () => {
    let fn = jest.fn();
    const TestComponent = () => {
      const ref = useRef();
      useOnClickOutside(ref, fn);

      return <div id="test" ref={ref} />;
    };
    const event = new MouseEvent("mousedown", { bubbles: true, cancelable: true });

    const { container, unmount } = render(<TestComponent />);

    fireEvent(container.querySelector("#test"), event);
    expect(fn).not.toHaveBeenCalled();
    fireEvent(container, event);
    expect(fn).toHaveBeenCalled();

    unmount();
  });
});
