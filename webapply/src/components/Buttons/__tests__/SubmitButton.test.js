import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { render, fireEvent } from "@testing-library/react";
import { SubmitButton } from "../SubmitButton";

describe("SubmitButton", () => {
  const theme = createMuiTheme();
  const renderComp = (props = {}) => {
    return render(
      <ThemeProvider theme={theme}>
        <SubmitButton label="Submit" labe {...props} />
      </ThemeProvider>
    );
  };
  it("renders without errors", () => {
    renderComp();
  });

  it("calls onClick handler when clicked", () => {
    const onClick = jest.fn();
    const { getByText } = renderComp({ onClick });
    const button = getByText("Submit"); // Replace "Submit" with the text on the button

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
