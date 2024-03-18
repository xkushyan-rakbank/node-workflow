import React from "react";
import { render } from "@testing-library/react";
import { InputGroup } from "../InputGroup";

describe("InputGroup", () => {
  it("renders children without error", () => {
    const { getByText } = render(
      <InputGroup>
        <div>Child Component 1</div>
        <div>Child Component 2</div>
      </InputGroup>
    );

    expect(getByText("Child Component 1")).toBeTruthy();
    expect(getByText("Child Component 2")).toBeTruthy();
  });

  it("applies extra classes correctly", () => {
    const { container } = render(
      <InputGroup extraClasses="custom-class">
        <div>Child Component</div>
      </InputGroup>
    );

    const firstChild = container.firstChild;

    expect(firstChild.className).toEqual(expect.stringContaining("custom-class"));
  });

  it("renders error message correctly", () => {
    const { getByText } = render(
      <InputGroup error="Error Message">
        <div>Child Component</div>
      </InputGroup>
    );

    expect(getByText("Error Message")).toBeTruthy();
  });
});
