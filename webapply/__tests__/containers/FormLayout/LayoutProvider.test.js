import React, { useContext } from "react";
import { render } from "@testing-library/react";

import {
  LayoutProvider,
  useLayoutParams,
  LayoutContext
} from "../../../src/containers/FormLayout/LayoutProvider";

describe("LayoutProvider tests", () => {
  const saveContext = jest.fn();
  const TestComponent = () => {
    useLayoutParams();

    return null;
  };
  const TestConsumer = () => {
    saveContext(useContext(LayoutContext));

    return null;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render component", () => {
    render(
      <LayoutProvider>
        <TestConsumer />
        <TestComponent />
      </LayoutProvider>
    );

    expect(saveContext.mock.calls[0][0]).toEqual([]);
    expect(saveContext.mock.calls[1][0]).toEqual([false, false, false]);
  });
});
