import React, { useContext } from "react";
import { render, act } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import {
  LayoutProvider,
  useLayoutParams,
  LayoutContext
} from "../../../src/containers/FormLayout/LayoutProvider";

describe("LayoutProvider tests", () => {
  const history = createMemoryHistory();
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
      <Router history={history}>
        <LayoutProvider>
          <TestConsumer />
          <TestComponent />
        </LayoutProvider>
      </Router>
    );

    expect(saveContext).toBeCalledTimes(2);
    expect(saveContext).nthCalledWith(1, []);
    expect(saveContext).nthCalledWith(2, [false, false, false]);

    act(() => {
      history.push("/somepage");
    });

    expect(saveContext).nthCalledWith(1, []);
  });
});
