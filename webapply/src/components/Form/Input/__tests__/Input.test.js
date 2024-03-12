import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import { Formik } from "formik";

import { Input } from "../Input";
import { checkBrowserIsIE } from "../../../../utils/checkBrowserIsIE";

describe("Input", () => {
  const onBlurMock = jest.fn();
  const onBeforeInputFunctionMock = jest.fn();
  const setFieldValue = jest.fn();
  const InputProps = {
    inputProps: {
      "aria-label": "input field"
    }
  };
  const form = {
    setFieldValue
  };

  const defaultInputProps = {
    disabled: false,
    placeholder: "Enter your name",
    label: "Name"
  };

  const renderComp = (props = defaultInputProps) =>
    render(
      <Formik initialValues={{}}>
        <Input
          data-testid="input"
          InputProps={props.InputProps || InputProps}
          form={{ errors: props.errors, touched: props.touched, ...form }}
          field={{ onBlur: onBlurMock, name: "test", value: "" }}
          contextualHelpText="contextualHelpText"
          contextualHelpProps={{}}
          onBeforeInput={onBeforeInputFunctionMock}
          placement="top"
          disabled={props.disabled}
          placeholder={props.placeholder}
          label={props.label}
          shrink={false}
          infoTitle="infoTitle"
          classes={{}}
          ErrorMessageComponent={() => <div>Error</div>}
          isLemnisk={props.lemnisk}
          totalLength={10}
          showCharLength={false}
          lemniskCall={() => {}}
          fieldDescription={props.fieldDescription}
          showCounter={props.showCounter}
          showEditIcon={props.showEditIcon}
          iconColor="grey"
          infoIcon="infoIcon"
          fieldValueLength={props.fieldValueLength}
        />
      </Formik>
    );
  it("renders without errors", () => {
    const { getByTestId } = renderComp();
    const input = getByTestId("input");
    expect(input).toBeTruthy();
  });

  it("handles onBlur event correctly", () => {
    const { getByTestId } = renderComp();
    const inputElement = getByTestId("input");
    const inputElem = inputElement.querySelector("input");
    act(() => {
      fireEvent.blur(inputElem);
    });

    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  it("handles onBlur if IE agent", () => {
    const originalUserAgent = window.navigator.userAgent;
    jest.spyOn(window.navigator, "userAgent", "get").mockReturnValue("test MSIE ");
    const { getByTestId } = renderComp();
    const inputElement = getByTestId("input");
    const inputElem = inputElement.querySelector("input");
    act(() => {
      fireEvent.blur(inputElem);
    });
    expect(checkBrowserIsIE()).toBe(true);

    // Restore the original user agent
    jest.spyOn(window.navigator, "userAgent", "get").mockReturnValue(originalUserAgent);
  });

  it("handles onBlur with lemnisk", () => {
    const { getByTestId } = renderComp({ lemnisk: true, fieldDescription: "fieldDescription" });
    const inputElement = getByTestId("input");
    const inputElem = inputElement.querySelector("input");
    act(() => {
      fireEvent.blur(inputElem);
    });
  });

  it("renders with placeholder correctly", () => {
    const placeholderText = "Enter your name";
    const { getByPlaceholderText } = renderComp({ placeholder: placeholderText });
    const inputElement = getByPlaceholderText(placeholderText);

    expect(inputElement).toBeTruthy();
  });

  it("renders with label correctly", () => {
    const labelText = "Name";
    const { getByTestId } = renderComp({ label: labelText });
    const inputElement = getByTestId("input");
    const inputElem = inputElement.querySelector("label");
    expect(inputElem).toHaveProperty("textContent", labelText);
  });

  it("renders with disabled state correctly", () => {
    const { getByTestId } = renderComp({ disabled: true });
    const inputElement = getByTestId("input");
    const inputElem = inputElement.querySelector("input");
    expect(inputElem).toHaveProperty("disabled", true);
  });

  it("handles paste event correctly", () => {
    const execCommandMock = jest.fn();
    document.execCommand = execCommandMock;

    const { getByTestId } = renderComp();
    const input = getByTestId("input");

    const pasteData = "test$";
    const expectedData = "test ";

    fireEvent.paste(input, {
      clipboardData: {
        getData: jest.fn().mockReturnValue(pasteData)
      }
    });

    expect(execCommandMock).toHaveBeenCalledWith("insertText", false, expectedData);
  });

  it("renders endAdornment when showEditIcon is true", () => {
    const { getByTestId } = renderComp({ showEditIcon: true });
    const inputElement = getByTestId("input");
    const inputElem = inputElement.querySelector("input");
    const endAdornment = inputElem.nextSibling;
    expect(endAdornment).toBeTruthy();
  });

  it("handles onClick of endAdornment when showEditIcon is true", async () => {
    const { getByTestId } = renderComp({ showEditIcon: true, disabled: true });
    const inputElement = getByTestId("inputParent");
    const endAdornment = getByTestId("inputAdornment").querySelector("span");
    const inputElem = inputElement.querySelector("input");

    act(() => {
      fireEvent.click(endAdornment);
    });

    await waitFor(() => {
      expect(inputElem).toHaveProperty("disabled", false);
    });
  });

  it("handles onBeforeInput event correctly", () => {
    const { getByTestId } = renderComp();
    const inputElement = getByTestId("input");
    const inputElem = inputElement.querySelector("input");
    fireEvent(inputElem, new Event("beforeinput", { data: "$" }));
    expect(inputElem).toHaveProperty("value", "");
  });

  it("handles onFocus event correctly", () => {
    const originalUserAgent = window.navigator.userAgent;
    jest.spyOn(window.navigator, "userAgent", "get").mockReturnValue("test MSIE ");
    const { getByTestId } = renderComp();
    const inputElement = getByTestId("input");
    const inputElem = inputElement.querySelector("input");
    act(() => {
      fireEvent.focus(inputElem);
      fireEvent.click(inputElem);
    });
    jest.spyOn(window.navigator, "userAgent", "get").mockReturnValue(originalUserAgent);
  });

  it("renders with showCounter as true", () => {
    const { getByTestId } = renderComp({
      showCounter: true,
      InputProps: { inputProps: { maxLength: 10 } },
      fieldDescription: "fieldDescription"
    });
    const parent = getByTestId("inputParent");
    const counter = parent.childNodes[1];
    expect(counter).toBeTruthy();
  });

  it("renders with error message", () => {
    const errors = { test: "Error" };
    const touched = { test: true };
    const { getByTestId } = renderComp({ errors, touched });
    const parent = getByTestId("inputParent");
    const errorMessage = parent.childNodes[2];
    expect(errorMessage).toBeTruthy();
  });

  it("renders with fieldValueLength", () => {
    const { getByTestId } = renderComp({ showCounter: true, fieldValueLength: 5 });
    const parent = getByTestId("inputParent");
    const counter = parent.childNodes[1];
    expect(counter).toBeTruthy();
  });
});
