import React from "react";
import { useDispatch } from "react-redux";
import { fireEvent, render, act } from "@testing-library/react";
import { Formik } from "formik";
import { Upload } from "../../../../../components/Upload/Upload";
import { uploadDocuments } from "../../../../../store/actions/uploadDocuments";
import { updateProspect } from "../../../../../store/actions/appConfig";
import { DocumentUpload } from "../DocumentUploadNew";

jest.mock("../../../../../components/Upload/Upload");
jest.mock("../../../../../store/selectors/appConfig");
jest.mock("../../../../../store/actions/appConfig");
jest.mock("../../../../../store/actions/uploadDocuments");
jest.mock("react-redux", () => ({
  useSelector: jest.fn().mockImplementation(fn => fn()),
  useDispatch: jest
    .fn()
    .mockImplementation(() => jest.fn())
    .mockReturnValue(fn => fn)
}));

jest.mock("../../../../../components/Upload/Upload", () => ({
  Upload: jest.fn().mockImplementation(() => null)
}));

describe("DocumentUpload component", () => {
  const file = new File(["file"], "file.png", { type: "image/png" });
  const acceptedFiles = [file];

  const commonProps = {
    touched: {},
    setTouched: jest.fn(),
    setFieldValue: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render component", () => {
    const props = {
      ...commonProps,
      values: {}
    };
    render(
      <Formik initialValues={{}}>
        <DocumentUpload {...props} />
      </Formik>
    );
    expect(Upload).toHaveBeenCalled();
  });

  it("should display add more button in disabled state", () => {
    const props = {
      ...commonProps,
      values: { tradeLicenseOrCOI: "", moa: [] }
    };
    const { getByTestId } = render(
      <Formik initialValues={{ moa: [""] }}>
        <DocumentUpload {...props} />
      </Formik>
    );
    const addMoreButton = getByTestId("addMoreMOA");
    expect(addMoreButton).toHaveProperty("disabled");
  });

  it("should handle removeDocument callback for tradeLicenseOrCOI", async () => {
    const props = {
      ...commonProps,
      values: {
        tradeLicenseOrCOI: [
          {
            preview: "blob:http://localhost:3000/17686b32-4671-4944-a400-dda94dfca8d2",
            fileName: "addressproof.jpeg",
            fileSize: 273228
          }
        ],
        moa: []
      }
    };

    render(
      <Formik
        initialValues={{
          tradeLicenseOrCOI: {
            preview: "blob:http://localhost:3000/17686b32-4671-4944-a400-dda94dfca8d2",
            fileName: "addressproof.jpeg",
            fileSize: 273228
          }
        }}
      >
        <DocumentUpload {...props} />
      </Formik>
    );

    expect(Upload).toHaveBeenCalled();
    act(() => {
      Upload.mock.calls[0][0].onDelete();
    });
    expect(updateProspect).toHaveBeenCalled();
  });

  it("should upload file correctly on drop handleDrpFile callback on tradeLicenseOrCOI", () => {
    const mockDispatch = jest.fn();
    const props = {
      ...commonProps,
      values: {}
    };
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <Formik initialValues={{}}>
        <DocumentUpload {...props} />
      </Formik>
    );

    expect(Upload).toHaveBeenCalled();
    act(() => {
      Upload.mock.calls[0][0].onDrop(acceptedFiles);
    });
    expect(mockDispatch).toHaveBeenCalledWith(
      uploadDocuments({
        docs: {
          "prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI": file
        },
        documentSection: "companyDocuments",
        onSuccess: expect.any(Function),
        onFailure: expect.any(Function),
        index: expect.any(Number)
      })
    );
  });

  it("should upload file correctly on drop handleDrpFile callback on moa", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    const props = {
      ...commonProps,
      values: {
        tradeLicenseOrCOI: {
          preview: "blob:http://localhost:3000/17686b32-4671-4944-a400-dda94dfca8d2",
          fileName: "addressproof.jpeg",
          fileSize: 273228
        },
        moa: [
          {
            preview: "blob:http://localhost:3000/17686b32-4671-4944-a400-dda94dfca8d2",
            fileName: "addressproof1.jpeg",
            fileSize: 273228
          }
        ]
      }
    };

    render(
      <Formik initialValues={{}}>
        <DocumentUpload {...props} />
      </Formik>
    );

    expect(Upload).toHaveBeenCalledTimes(2);
    const rendersCount = Upload.mock.calls.length;
    act(() => {
      Upload.mock.calls[rendersCount - 1][0].onDrop(acceptedFiles);
    });
    expect(Upload.mock.calls[rendersCount - 1][0].file).toBe(props.values.moa[0].fileName);
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
    const { getByTestId, getAllByTestId } = render(
      <Formik
        initialValues={{
          moa: [
            {
              preview: "blob:http://localhost:3000/17686b32-4671-4944-a400-dda94dfca8d2",
              fileName: "addressproof.jpeg",
              fileSize: 273228
            }
          ]
        }}
      >
        <DocumentUpload {...props} />
      </Formik>
    );
    const addMoreButton = getByTestId("addMoreMOA");
    const moaFields = getAllByTestId("moaWrapperDiv");
    expect(moaFields.length).toBe(1);
    fireEvent.click(addMoreButton);
  });

  it("should render correct number of moa fields and call removeDocument on click on cross icon", () => {
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
      }
    ];
    const props = {
      ...commonProps,
      values: { moa: moaList }
    };

    const { getAllByTestId } = render(
      <Formik initialValues={{ moa: moaList }}>
        <DocumentUpload {...props} />
      </Formik>
    );
    const moaFields = getAllByTestId("moaWrapperDiv");
    const removeIconBtn = getAllByTestId("removeIconButton");

    expect(Upload).toHaveBeenCalled();
    expect(moaFields.length).toBe(2);
    removeIconBtn.forEach((btn, index) => {
      btn.click();
    });
  });
  it("should remove moa field on click on remove button", () => {
    const handleFieldDelete = jest.fn();
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

    render(
      <Formik
        initialValues={{
          moa: [
            {
              preview: "blob:http://localhost:3000/17686b32-4671-4944-a400-dda94dfca8d2",
              fileName: "addressproof.jpeg",
              fileSize: 273228
            }
          ]
        }}
      >
        <DocumentUpload {...props} removeDocument={handleFieldDelete} />
      </Formik>
    );

    expect(Upload).toHaveBeenCalledTimes(2);
    const rendersCount = Upload.mock.calls.length;
    act(() => {
      Upload.mock.calls[rendersCount - 1][0].onDelete();
    });
    expect(updateProspect).toHaveBeenCalled();
  });
});
