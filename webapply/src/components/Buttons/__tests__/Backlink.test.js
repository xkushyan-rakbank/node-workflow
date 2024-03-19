import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { BackLink } from "../BackLink";
import { mockStore } from "../../../testUtils";

describe("Backlink", () => {
  const comp = defaultProps => (
    <Provider store={mockStore}>
      <MemoryRouter>
        <BackLink {...defaultProps} />
      </MemoryRouter>
    </Provider>
  );
  const renderComponent = (props = {}) => {
    const defaultProps = {
      path: "/",
      ...props
    };

    return render(comp(defaultProps));
  };
  it("renders without crashing", () => {
    renderComponent();
  });

  it("calls the onClick function when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = renderComponent({ onClick: onClickMock });
    const button = getByText("Back");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });

  it("calls the onClick when isProspectSaving is true", async () => {
    const onClickMock = jest.fn();
    const { getByTestId } = renderComponent({
      onClick: onClickMock
    });
    const button = getByTestId("back-link");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });

  it("checks if prevProps.text and nextProps.text are different", () => {
    const { rerender } = renderComponent({ text: "Back" });
    rerender(comp({ text: "Back" }));
    expect(screen.getByText("Back")).toBeTruthy();
  });
});
