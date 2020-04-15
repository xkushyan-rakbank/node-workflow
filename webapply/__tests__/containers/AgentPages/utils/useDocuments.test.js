import React from "react";
import { Provider } from "react-redux";
import { render, act } from "@testing-library/react";
import configureStore from "redux-mock-store";

import { useDocuments } from "../../../../src/containers/AgentPages/SearchedAppInfo/utils/useDocuments";
import {
  getProspectOverviewId,
  getOverviewDocuments
} from "../../../../src/store/selectors/searchProspect";
import { downloadDocumentFile } from "../../../../src/store/actions/uploadDocuments";

jest.mock("../../../../src/store/selectors/searchProspect");
jest.mock("../../../../src/store/actions/uploadDocuments");

describe("useDocuments test", () => {
  const SomeComponent = jest.fn(() => null);
  const TestComponent = () => {
    const props = useDocuments();

    return <SomeComponent {...props} />;
  };
  const mockStore = configureStore([]);
  const state = "some state";
  const store = mockStore(state);
  const prospectId = "some prospect id";
  const docs = "some docs";

  const TestComponentWithProvider = () => (
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    getProspectOverviewId.mockReturnValue(prospectId);
    getOverviewDocuments.mockReturnValue(docs);
  });

  it("should return data for render test component", () => {
    render(<TestComponentWithProvider />);

    expect(SomeComponent.mock.calls[0][0]).toMatchObject({
      prospectId,
      docs
    });
  });

  it("should return empty object when overview documents is not set", () => {
    getOverviewDocuments.mockReturnValue(null);

    render(<TestComponentWithProvider />);

    expect(SomeComponent.mock.calls[0][0].docs).toEqual({});
  });

  it("should handle `downloadDocumentFile` action", () => {
    const documentKey = "some document key";
    const fileName = "some file name";
    downloadDocumentFile.mockImplementation((...args) => ({ type: "some action", payload: args }));
    render(<TestComponentWithProvider />);

    act(() => {
      SomeComponent.mock.calls[0][0].downloadDocument(documentKey, fileName)
    });

    expect(store.getActions()).toEqual([
      {
        type: "some action",
        payload: [prospectId, documentKey, fileName]
      }
    ]);
  });
});
