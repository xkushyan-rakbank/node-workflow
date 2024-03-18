import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CheckboxGroup } from "../CheckboxGroup";

describe("CheckboxGroup", () => {
  const options = [
    { key: "1", value: "Option 1", label: "Option 1" },
    { key: "2", value: "Option 2", label: "Option 2" },
    { key: "3", value: "Option 3", label: "Option 3" }
  ];

  const onChange = jest.fn();

  const renderComp = (props = {}) => {
    return render(
      <CheckboxGroup
        typeRadio={false}
        options={props.options || options}
        field={{ name: "checkboxGroup", onChange }}
        onSelect={props.onSelect}
        form={{ errors: props.errors, touched: props.touched }}
        infoTitle={props.infoTitle}
        isInlineStyle={props.isInlineStyle}
        isTwoCoulmnStyle={props.isTwoCoulmnStyle}
        extractLabel={props.extractLabel}
        extractId={props.extractId}
        extractValue={props.extractValue}
        clickHandled={props.clickHandled}
      />
    );
  };
  it("renders checkboxes with correct options", () => {
    const { getByLabelText } = renderComp();

    options.forEach(option => {
      const checkbox = getByLabelText(option.label);
      expect(checkbox).toBeTruthy();
    });
  });

  it("calls onSelect callback when a checkbox is selected", () => {
    const onSelectMock = jest.fn();
    const { getByLabelText } = renderComp({ onSelect: onSelectMock });

    const checkbox = getByLabelText("Option 1");
    fireEvent.click(checkbox);

    expect(onSelectMock).toHaveBeenCalled();
  });

  it("displays error message when there are errors", () => {
    const errors = { checkboxGroup: "This field is required" };
    const { getByText } = render(
      <CheckboxGroup
        options={options}
        field={{ name: "checkboxGroup" }}
        form={{ errors, touched: { checkboxGroup: true } }}
      />
    );

    const errorMessage = getByText("This field is required");
    expect(errorMessage).toBeTruthy();
  });

  it("renders radio buttons when typeRadio is true", () => {
    const { getByLabelText } = render(
      <CheckboxGroup
        typeRadio={true}
        options={options}
        field={{ name: "checkboxGroup" }}
        form={{ errors: {}, touched: {} }}
      />
    );

    options.forEach(option => {
      const radio = getByLabelText(option.label);
      expect(radio).toBeTruthy();
    });
  });

  it("renders when options is an empty array", () => {
    const { container } = render(
      <CheckboxGroup
        typeRadio={false}
        options={[]}
        field={{ name: "checkboxGroup" }}
        form={{ errors: {}, touched: {} }}
      />
    );

    expect(container).toBeTruthy();
  });

  it("calls extractLabel by default and label is used", () => {
    const extractLabel = jest.fn();
    renderComp({ extractLabel });
    expect(extractLabel).toHaveBeenCalled();
  });

  it("calls extractId by default and key is used", () => {
    const extractId = jest.fn();
    renderComp({ extractId });
    expect(extractId).toHaveBeenCalled();
  });

  it("calls extractValue by default and value is used", () => {
    const extractValue = jest.fn();
    renderComp({ extractValue });
    expect(extractValue).toHaveBeenCalled();
  });

  it("renders infoTitle when provided", () => {
    const { getByText } = renderComp({ infoTitle: "infoTitle" });

    const infoTitle = getByText("infoTitle");
    expect(infoTitle).toBeTruthy();
  });

  it("renders when isInlineStyle is false", () => {
    const { container } = renderComp({ isInlineStyle: false });

    expect(container).toBeTruthy();
  });

  it("renders when isTwoCoulmnStyle is true", () => {
    const { container } = renderComp({ isTwoCoulmnStyle: true });

    expect(container).toBeTruthy();
  });

  it("renders when displayText is provided", () => {
    const { getByLabelText } = renderComp({
      options: [{ displayText: "Option 1", key: "1", value: "Option 1" }]
    });

    const label = getByLabelText("Option 1");

    expect(label).toBeTruthy();
  });

  it("calls clickHandled when provided", () => {
    const clickHandled = true;
    const { getByLabelText } = renderComp({ clickHandled });

    const checkbox = getByLabelText("Option 1");
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalled();
  });
});
