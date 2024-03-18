import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { NumberFormat, POBoxNumberInput } from "../NumberFormat";

describe("NumberFormat", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(<NumberFormat data-testid="numberInput" />);
    const numberFormatInput = getByTestId("numberInput");

    expect(numberFormatInput).toBeTruthy();
  });

  it("should call onChange when input value changes", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <NumberFormat onChange={onChangeMock} data-testid="numberInput" name="numberInput" />
    );
    const numberFormatInput = getByTestId("numberInput");

    fireEvent.change(numberFormatInput, { target: { value: "12345" } });

    expect(onChangeMock).toHaveBeenCalled();
  });

  it("should render POBoxNumberInput correctly", () => {
    const { getByTestId } = render(
      <POBoxNumberInput data-testid="poboxInput" name="numberInput" />
    );
    const poboxInput = getByTestId("poboxInput");

    expect(poboxInput).toBeTruthy();
  });
});
