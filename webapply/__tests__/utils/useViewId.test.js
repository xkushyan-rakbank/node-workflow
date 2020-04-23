import React from "react";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";

import { useViewId } from "../../src/utils/useViewId";

import { updateViewId } from "../../src/store/actions/appConfig";

jest.mock("../../src/store/actions/appConfig");

describe("useViewId test", () => {
  const store = configureStore([])({});
  const history = createMemoryHistory();
  const updateViewIdAction = { type: "update view id" };

  const TestComponent = () => {
    useViewId();

    return null;
  };

  beforeEach(() => {
    updateViewId.mockReturnValue(updateViewIdAction);
  });

  it("should dispatch `updateViewId` action on mount component", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <TestComponent />
        </Router>
      </Provider>
    );

    expect(updateViewId).toBeCalledWith("/", false);
    expect(store.getActions()).toEqual([updateViewIdAction]);
  });
});
