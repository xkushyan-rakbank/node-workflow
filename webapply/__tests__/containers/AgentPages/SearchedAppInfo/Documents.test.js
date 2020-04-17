import React from "react";
import { Provider } from "react-redux";
import { render, act } from "@testing-library/react";
import configureStore from "redux-mock-store";

import { Documents } from "../../../../src/containers/AgentPages/SearchedAppInfo/Documents";
import { Documents as DocumentsStep } from "../../../../src/containers/AgentPages/SearchedAppInfo/components/Documents";
import {
  getProspectOverviewId,
  getOverviewDocuments
} from "../../../../src/store/selectors/searchProspect";
import { downloadDocumentFile } from "../../../../src/store/actions/uploadDocuments";

jest.mock("../../../../src/store/selectors/searchProspect");
jest.mock("../../../../src/store/actions/uploadDocuments");
jest.mock("../../../../src/containers/AgentPages/SearchedAppInfo/components/Documents");

describe("Documents test", () => {
  const mockStore = configureStore([]);
  const state = "some state";
  const store = mockStore(state);
  const prospectId = "some prospect id";
  const docs = "some docs";

  const TestComponentWithProvider = () => (
    <Provider store={store}>
      <Documents />
    </Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
    getProspectOverviewId.mockReturnValue(prospectId);
    getOverviewDocuments.mockReturnValue(docs);
    DocumentsStep.mockReturnValue(null);
  });

  it("should render test component", () => {
    render(<TestComponentWithProvider />);

    expect(DocumentsStep.mock.calls[0][0]).toMatchObject({
      docs
    });
  });

  it("should render test component with props `docs` as empty object when overview documents is not set", () => {
    getOverviewDocuments.mockReturnValue(null);

    render(<TestComponentWithProvider />);

    expect(DocumentsStep.mock.calls[0][0].docs).toEqual({});
  });

  it("should handle `downloadDocumentFile` action", () => {
    const documentKey = "some document key";
    const fileName = "some file name";
    downloadDocumentFile.mockImplementation((...args) => ({ type: "some action", payload: args }));
    render(<TestComponentWithProvider />);

    act(() => {
      DocumentsStep.mock.calls[0][0].downloadDocument(documentKey, fileName);
    });

    expect(store.getActions()).toEqual([
      {
        type: "some action",
        payload: [prospectId, documentKey, fileName]
      }
    ]);
  });
});
