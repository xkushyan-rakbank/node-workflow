import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import { useOnClickOutside } from "../../src/utils/useOnClickOutside";

describe("useOnClickOutside test", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("should handle callback on click outside", () => {
    let fn = jest.fn();
    const TestComponent = () => {
      const ref = useRef();
      useOnClickOutside(ref, fn);

      return <div id="test" ref={ref} />;
    };

    act(() => {
      ReactDOM.render(<TestComponent />, container);
    });
    act(() => {
      container
        .querySelector("div#test")
        .dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(fn).not.toHaveBeenCalled();
    act(() => {
      container.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(fn).toHaveBeenCalled();
  });
});
