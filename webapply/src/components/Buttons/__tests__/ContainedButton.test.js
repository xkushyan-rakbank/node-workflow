import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ContainedButton } from "../ContainedButton";

describe("ContainedButton", () => {
  it("renders button with label", () => {
    const { getByText } = render(<ContainedButton label="Click me" />);
    const buttonElement = getByText("Click me");
    expect(buttonElement).toBeTruthy();
  });

  it("renders button without label", () => {
    const { getByTestId } = render(<ContainedButton />);
    const buttonElement = getByTestId("contained-button");
    expect(buttonElement).toBeTruthy();
  });

  it("calls handleClick when button is clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<ContainedButton label="Click me" handleClick={handleClick} />);
    const buttonElement = getByText("Click me");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when isDisplayLoader is true", () => {
    const { getByTestId } = render(<ContainedButton label="Click me" isDisplayLoader={true} />);
    const buttonElement = getByTestId("contained-button");
    expect(buttonElement).toHaveProperty("disabled", true);
  });

  it("renders with withRightArrow when withRightArrow is true and isSearchApplicant is true", () => {
    const { getByTestId } = render(
      <ContainedButton label="Click me" withRightArrow={true} isSearchApplicant={true} />
    );
    const buttonElement = getByTestId("contained-button");
    expect(buttonElement).toBeTruthy();
  });

  it("renders with withRightArrow when withRightArrow is true and isSearchApplicant is false", () => {
    const { getByTestId } = render(
      <ContainedButton label="Click me" withRightArrow={true} isSearchApplicant={false} />
    );
    const buttonElement = getByTestId("contained-button");
    expect(buttonElement).toBeTruthy();
  });
});
