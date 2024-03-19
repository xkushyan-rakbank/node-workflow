import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { NextStepButton } from "../NextStepButton";

describe("NextStepButton", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <ThemeProvider theme={createMuiTheme()}>
        <NextStepButton label="Submit" />
      </ThemeProvider>
    );
    const buttonElement = getByText("Submit");
    expect(buttonElement).toBeTruthy();
  });
});
