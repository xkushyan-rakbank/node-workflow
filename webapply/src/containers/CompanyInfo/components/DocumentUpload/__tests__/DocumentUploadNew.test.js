import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, act, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Formik } from "formik";
import DocumentUpload from "../DocumentUploadNew";

jest.mock("connected-react-router", () => ({
  routerMiddleware: jest.fn()
}));

describe("DocumentUpload component", () => {
  let store;

  const mockStore = configureStore([]);
  const file = new File(["file"], "file.png", { type: "image/png" });

  const commonProps = {
    touched: {},
    setTouched: jest.fn(),
    setFieldValue: jest.fn(),
    values: {}
  };

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore({
      inputFieldBehaviours: {
        "prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI": {
          visible: true,
          enabled: true
        },
        "prospect.prospectDocuments.companyDocument.moa": {
          visible: true,
          enabled: true
        }
      },
      decisions: {
        decisionLoading: {}
      }
    });
  });

  const renderComp = (props = commonProps) =>
    render(
      <Provider store={store}>
        <Formik initialValues={props.values}>
          <DocumentUpload {...props} />
        </Formik>
      </Provider>
    );

  it("should render component", () => {
    const { getByTestId } = renderComp();
    const documentUploadSection = getByTestId("DocumentUploadSection");
    expect(documentUploadSection).toBeTruthy();
  });

  it("should handle removeDocument callback for tradeLicenseOrCOI", async () => {
    const props = {
      ...commonProps,
      values: {
        tradeLicenseOrCOI: {
          preview: "blob:http://localhost:3000/17686b32-4671-4944-a400-dda94dfca8d2",
          fileName: "addressproof.jpeg",
          fileSize: 273228
        },
        moa: []
      }
    };
    renderComp(props);
    const tradeLicenseOrCOIUploadField = screen.getByTestId("tradeLicenseOrCOIUploadField");
    expect(tradeLicenseOrCOIUploadField).toBeTruthy();
    const removeButton = screen.getByTestId("removeButton");
    removeButton.click();
  });

  it("should upload file correctly on drop handleDrpFile callback on tradeLicenseOrCOI", async () => {
    const file = new File(["file contents"], "filename.txt", { type: "text/plain" });
    const props = {
      ...commonProps,
      values: {}
    };

    renderComp(props);

    const tradeLicenseOrCOIUploadField = screen.getByTestId("tradeLicenseOrCOIUploadField");
    expect(tradeLicenseOrCOIUploadField).toBeTruthy();
    const uploadFileInput = screen.getByTestId("uploadFileInput");
    if (file) {
      act(() => {
        // fireEvent.drop(tradeLicenseOrCOIUploadField, {
        //   dataTransfer: { files: [file] }
        // });
        fireEvent.change(uploadFileInput, {
          dataTransfer: { files: [file] }
        });
      });
    } else {
      console.error("file is undefined");
    }
  });

  it("should upload file correctly on drop handleDrpFile callback on moa", () => {
    const props = {
      ...commonProps,
      values: {
        tradeLicenseOrCOI: {
          preview: "blob:http://localhost:3000/17686b32-4671-4944-a400-dda94dfca8d2",
          fileName: "addressproof.jpeg",
          fileSize: 273228
        },
        moa: [""]
      }
    };
    renderComp(props);
    const uploadField = screen.getByTestId("moaUploadField");
    expect(uploadField).toBeTruthy();
    const uploadFileInput = screen.getByTestId("uploadFileInput");
    fireEvent.change(uploadFileInput, {
      dataTransfer: { acceptedFiles: [file] }
    });
  });

  it("should add more moa fields on click on add more button", () => {
    const props = {
      ...commonProps,
      values: {
        tradeLicenseOrCOI: "",
        moa: [
          {
            preview: "blob:http://localhost:3000/17686b32-4671-4944-a400-dda94dfca8d2",
            fileName: "addressproof.jpeg",
            fileSize: 273228
          }
        ]
      }
    };
    renderComp(props);
    const uploadFields = screen.getAllByTestId("moaUploadField");
    expect(uploadFields.length).toBe(1);
    const addMoreButton = screen.getByTestId("addMoreMOA");
    addMoreButton.click();
  });

  it("should render correct number of moa fields and call removeDocument on click on cross icon", async () => {
    const moaList = [
      {
        preview: "blob:http://localhost:3000/17686b32-4671-4944-a400-dda94dfca8d2",
        fileName: "addressproof.jpeg",
        fileSize: 273228
      },
      {
        preview: "blob:http://localhost:3000/31da2dd8-f983-4f02-8c3a-f657b1a9926b",
        fileName: "proof of income.png",
        fileSize: 64078
      },
      {
        preview: "blob:http://localhost:3000/31da2dd8-f983-4f02-8c3a-f657b1a9926b",
        fileName: "proof of income.png",
        fileSize: 64078
      }
    ];
    const props = {
      ...commonProps,
      values: { moa: moaList }
    };
    renderComp(props);
    const moaFields = screen.getAllByTestId("moaUploadField");
    expect(moaFields.length).toBe(3);
    const removeButtons = screen.getAllByTestId("removeIconButton");
    removeButtons[1].click();
  });
  it("should remove moa field on click on remove button", () => {
    const props = {
      ...commonProps,
      values: {
        moa: [
          {
            preview: "blob:http://localhost:3000/17686b32-4671-4944-a400-dda94dfca8d2",
            fileName: "addressproof.jpeg",
            fileSize: 273228
          }
        ]
      }
    };
    renderComp(props);
    const moaUploadField = screen.getByTestId("moaUploadField");
    expect(moaUploadField).toBeTruthy();
    const removeButton = screen.getByTestId("removeButton");
    removeButton.click();
  });
  it("should not render moa section if useDecisions for moa path is not enabled", () => {
    store = mockStore({
      inputFieldBehaviours: {
        "prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI": {
          visible: true,
          enabled: true
        },
        "prospect.prospectDocuments.companyDocument.moa": {
          visible: false,
          enabled: true
        }
      },
      decisions: {
        decisionLoading: {}
      }
    });
    renderComp();
    const moaSection = screen.queryByTestId("moaWrapperDiv");
    expect(moaSection).toBeNull();
  });
});
