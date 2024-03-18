import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ExpandMoreButton } from "../ExpandMoreButton";

describe("ExpandMoreButton", () => {
  it("should call onClick when clicked", () => {
    const onClickMock = jest.fn();
    const { getByTestId } = render(<ExpandMoreButton onClick={onClickMock} />);

    const expandMoreButton = getByTestId("expand-more-button");
    fireEvent.click(expandMoreButton);

    expect(onClickMock).toHaveBeenCalled();
  });

  it("should call default onClick when onClick is not provided", () => {
    const { getByTestId } = render(<ExpandMoreButton />);
    const expandMoreButton = getByTestId("expand-more-button");
    fireEvent.click(expandMoreButton);
  });
});
