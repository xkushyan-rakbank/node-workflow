import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import { useOnClickOutside } from "../../src/utils/useOnClickOutside";

let root;

describe("useOnClickOutside tests", () => {
  beforeEach(() => {
    root = document.createElement("div");
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(root);
  });
  it("should return handler call when clicked on target", () => {
    const mouseEvent = new MouseEvent("mousedown");

    const spanHandler = jest.fn(() => true);
    const outsideHandler = jest.fn(() => false);
    let outsideRef = null;
    let divRef = null;
    let spanRef = null;

    const Component = () => {
      return (
        <div id="outside" ref={node => (outsideRef = node)}>
          <div id="container" ref={node => (divRef = node)}>
            <span id="nested" ref={node => (spanRef = node)} onClick={spanHandler}>
              test
            </span>
          </div>
        </div>
      );
    };

    ReactDOM.render(<Component />, root);

    const containerRef = { current: divRef }; // emulate UseRef output
    const { rerender } = renderHook(() => useOnClickOutside(containerRef, outsideHandler));

    ReactTestUtils.Simulate.click(spanRef);
    expect(spanHandler).toBeCalled();
    expect(spanHandler).toHaveReturnedWith(true);

    rerender(containerRef, outsideHandler);
    ReactTestUtils.Simulate.click(outsideRef);
    document.dispatchEvent(mouseEvent);
    expect(outsideHandler).toBeCalled();
    expect(outsideHandler).toHaveReturnedWith(false);
  });
});
