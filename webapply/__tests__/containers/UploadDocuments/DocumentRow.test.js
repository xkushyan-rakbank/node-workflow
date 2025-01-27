import React from "react";
import { render, act } from "@testing-library/react";
import {
  getIsEditableStatusSearchInfo,
  getProspectStatus
} from "../../../src/store/selectors/searchProspect";
import { getProgress, getUploadErrors } from "../../../src/store/selectors/uploadDocuments";
import {
  getProspect,
  getOrganizationInfo,
  getOrgKYCDetails
} from "../../../src/store/selectors/appConfig";
import { DocumentRow } from "../../../src/containers/UploadDocuments/DocumentRow";
import { DocumentRowComponent } from "../../../src/containers/UploadDocuments/components/DocumentRow/DocumentRow";
import { cancelDocUpload, docUpload } from "../../../src/store/actions/uploadDocuments";
import {
  COMPANY_DOCUMENTS,
  STAKEHOLDER_DOCUMENTS,
  UPLOADED,
  COMPANY_BANK_STATEMENTS,
  COMPANY_ADDRESS_PROOF,
  COMPANY_INVOICES,
  PERSONAL_BANK_STATEMENTS,
  PERSONAL_BACKGROUND,
  COMPANY_BANK_STATEMENTS_DOCTYPE,
  COMPANY_ADDRESS_PROOF_DOCTYPE,
  COMPANY_INVOICES_DOCTYPE,
  PERSONAL_BANK_STATEMENTS_DOCTYPE,
  PERSONAL_BACKGROUND_DOCTYPE
} from "../../../src/constants";
import { updateProspect } from "../../../src/store/actions/appConfig";
import { sendProspectToAPI } from "../../../src/store/actions/sendProspectToAPI";

jest.mock("react-redux", () => ({
  useSelector: jest.fn().mockImplementation(fn => fn()),
  useDispatch: jest
    .fn()
    .mockImplementation(() => jest.fn())
    .mockReturnValue(fn => fn)
}));
jest.mock("../../../src/store/selectors/searchProspect");
jest.mock("../../../src/store/selectors/uploadDocuments");
jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/store/actions/uploadDocuments");
jest.mock("../../../src/store/actions/appConfig");
jest.mock("../../../src/store/actions/sendProspectToAPI");
jest.mock("../../../src/containers/UploadDocuments/components/DocumentRow/DocumentRow", () => ({
  DocumentRowComponent: jest.fn().mockImplementation(() => null)
}));

describe("DocumentRow container tests", () => {
  const documentKey = "some key";
  const documentType = "some document type";
  const document = {
    documentKey,
    documentType,
    uploadStatus: "some status"
  };
  const type = COMPANY_DOCUMENTS;
  const index = "some index";
  const stakeholderIndex = "some index";
  const props = { document, type, index, stakeholderIndex };

  const isApplyEditApplication = true;
  const prospectStatusInfo = "some info";
  const error = "some error";
  const uploadErrors = {
    [documentKey]: error
  };
  const docProgress = 50;
  const progress = {
    [documentKey]: docProgress
  };
  const organizationInfo = { dateOfIncorporation: "10-12-2018", licenseIssueDate: "10-12-2018" };
  const orgKYCDetails = {
    otherBankingRelationshipsInfo: {
      otherBankingRelationshipsExist: true
    }
  };
  const documentsArr = {
    companyDocuments: [],
    companyBankStatements: {
      limit: 6,
      documents: [{ documentType: COMPANY_BANK_STATEMENTS_DOCTYPE }]
    },
    companyAddressProof: {
      limit: 3,
      documents: [{ documentType: COMPANY_ADDRESS_PROOF_DOCTYPE }]
    },
    companyInvoices: {
      limit: 10,
      documents: [
        { documentType: COMPANY_INVOICES_DOCTYPE },
        { documentType: COMPANY_INVOICES_DOCTYPE }
      ]
    },
    stakeholdersDocuments: {
      "0_stake holder": {
        documents: [],
        personalBankStatements: {
          limit: 6,
          documents: [
            { documentType: PERSONAL_BANK_STATEMENTS_DOCTYPE },
            { documentType: PERSONAL_BANK_STATEMENTS_DOCTYPE }
          ]
        },
        personalBackground: {
          limit: 1,
          documents: [{ documentType: PERSONAL_BACKGROUND_DOCTYPE }]
        }
      }
    },
    otherDocuments: []
  };
  const prospect = { some: "field", documents: documentsArr };

  getIsEditableStatusSearchInfo.mockReturnValue(isApplyEditApplication);
  getProspectStatus.mockReturnValue(prospectStatusInfo);
  getUploadErrors.mockReturnValue(uploadErrors);
  getProspect.mockReturnValue(prospect);
  getOrganizationInfo.mockReturnValue(organizationInfo);
  getOrgKYCDetails.mockReturnValue(orgKYCDetails);

  beforeEach(() => {
    getProgress.mockReturnValue(progress);

    jest.clearAllMocks();
  });

  it("should pass default props", () => {
    render(<DocumentRow {...props} />);

    expect(DocumentRowComponent).toHaveBeenCalled();
    expect(DocumentRowComponent.mock.calls[0][0]).toMatchObject({
      isUploadError: error,
      isUploaded: false,
      isUploading: false,
      percentComplete: 50,
      selectedFile: null,
      document
    });
  });

  it("stakeholder undefined props", () => {
    const props = { document, type, index };
    render(<DocumentRow {...props} />);
    expect(DocumentRowComponent).toHaveBeenCalled();
  });

  it("should pass percentComplete as 100 if doc is Uploaded", () => {
    const document = {
      documentKey,
      documentType,
      uploadStatus: UPLOADED
    };
    render(<DocumentRow {...props} document={document} />);

    expect(DocumentRowComponent).toHaveBeenCalled();
    expect(DocumentRowComponent.mock.calls[0][0].percentComplete).toBe(100);
  });

  it("should pass percentComplete as 0 if no info about progress", () => {
    const progress = {};
    getProgress.mockReturnValue(progress);
    render(<DocumentRow {...props} />);

    expect(DocumentRowComponent).toHaveBeenCalled();
    expect(DocumentRowComponent.mock.calls[0][0].percentComplete).toBe(0);
  });

  it("should handle uploadDocument callback", () => {
    const file = "some file";
    render(<DocumentRow {...props} />);

    expect(DocumentRowComponent).toHaveBeenCalledTimes(1);

    act(() => {
      DocumentRowComponent.mock.calls[0][0].uploadDocument(file);
    });
    expect(DocumentRowComponent).toHaveBeenCalledTimes(2);

    expect(docUpload).toHaveBeenCalled();
    expect(docUpload.mock.calls[0][0].documentType).toBe(documentType);
    expect(DocumentRowComponent.mock.calls[1][0].selectedFile).toBe(file);
  });

  it("should handle uploadDocument callback for multiDocument", () => {
    const file = "some file";
    const uploadMultiDocument = jest.fn();
    render(
      <DocumentRow
        {...props}
        multiSelectedFile={file}
        multiDoc={true}
        uploadMultiDocument={uploadMultiDocument}
      />
    );

    expect(DocumentRowComponent).toHaveBeenCalledTimes(2);

    act(() => {
      DocumentRowComponent.mock.calls[0][0].uploadDocument(file);
    });
    expect(DocumentRowComponent).toHaveBeenCalledTimes(2);
    expect(DocumentRowComponent.mock.calls[1][0].selectedFile).toBe(file);
  });

  it("should handle uploadDocument callback without documentType in prop", () => {
    const document = {
      documentKey,
      uploadStatus: "some status"
    };
    const file = "some file";
    render(<DocumentRow {...props} document={document} />);

    expect(DocumentRowComponent).toHaveBeenCalledTimes(1);

    act(() => {
      DocumentRowComponent.mock.calls[0][0].uploadDocument(file);
    });
    expect(DocumentRowComponent).toHaveBeenCalledTimes(2);

    expect(docUpload).toHaveBeenCalled();
    expect(docUpload.mock.calls[0][0].documentType).toBe("");
    expect(DocumentRowComponent.mock.calls[1][0].selectedFile).toBe(file);
  });

  it("should handle fileUploadCancel with company docs", () => {
    render(<DocumentRow {...props} />);

    expect(DocumentRowComponent).toHaveBeenCalledTimes(1);

    act(() => {
      DocumentRowComponent.mock.calls[0][0].cancelHandler();
    });

    expect(updateProspect).toHaveBeenCalledWith({
      [`prospect.documents[${COMPANY_DOCUMENTS}][${index}].uploadStatus`]: "NotUploaded"
    });
    expect(cancelDocUpload).toHaveBeenCalledWith(documentKey);
    const rendersCount = DocumentRowComponent.mock.calls.length;
    expect(DocumentRowComponent.mock.calls[rendersCount - 1][0].selectedFile).toBe(null);
    expect(sendProspectToAPI).toHaveBeenCalled();
  });

  it("should handle fileUploadCancel with COMPANY_BANK_STATEMENTS", () => {
    const document = {
      documentKey,
      documentType: COMPANY_BANK_STATEMENTS_DOCTYPE,
      uploadStatus: "some status",
      multiDoc: true
    };
    const props = { document, type, index, stakeholderIndex };
    render(<DocumentRow {...props} type={COMPANY_BANK_STATEMENTS} />);

    expect(DocumentRowComponent).toHaveBeenCalledTimes(1);

    act(() => {
      DocumentRowComponent.mock.calls[0][0].cancelHandler();
    });

    expect(updateProspect).toHaveBeenCalledWith({
      [`prospect.documents[${COMPANY_BANK_STATEMENTS}].documents[${index}].uploadStatus`]: "NotUploaded"
    });
    expect(cancelDocUpload).toHaveBeenCalledWith(documentKey);
    const rendersCount = DocumentRowComponent.mock.calls.length;
    expect(DocumentRowComponent.mock.calls[rendersCount - 1][0].selectedFile).toBe(null);
    expect(sendProspectToAPI).toHaveBeenCalled();
  });

  it("should handle fileUploadCancel with COMPANY_ADDRESS_PROOF", () => {
    const document = {
      documentKey,
      documentType: COMPANY_ADDRESS_PROOF,
      uploadStatus: "some status",
      multiDoc: true
    };
    const props = { document, type, index, stakeholderIndex };
    render(<DocumentRow {...props} type={COMPANY_ADDRESS_PROOF} />);

    expect(DocumentRowComponent).toHaveBeenCalledTimes(1);

    act(() => {
      DocumentRowComponent.mock.calls[0][0].cancelHandler();
    });

    expect(updateProspect).toHaveBeenCalledWith({
      [`prospect.documents[${COMPANY_ADDRESS_PROOF}].documents[${index}].uploadStatus`]: "NotUploaded"
    });
    expect(cancelDocUpload).toHaveBeenCalledWith(documentKey);
    const rendersCount = DocumentRowComponent.mock.calls.length;
    expect(DocumentRowComponent.mock.calls[rendersCount - 1][0].selectedFile).toBe(null);
    expect(sendProspectToAPI).toHaveBeenCalled();
  });

  it("should handle fileUploadCancel with COMPANY_INVOICES", () => {
    const document = {
      documentKey,
      documentType: COMPANY_INVOICES,
      uploadStatus: "some status",
      multiDoc: true
    };
    const index = 0;
    const props = { document, type, index, stakeholderIndex };
    render(<DocumentRow {...props} type={COMPANY_INVOICES} />);

    expect(DocumentRowComponent).toHaveBeenCalledTimes(1);

    act(() => {
      DocumentRowComponent.mock.calls[0][0].cancelHandler();
    });
    // expect(updateProspect).toHaveBeenCalledWith({
    //   [`prospect.documents[${COMPANY_INVOICES}].documents[${index}].uploadStatus`]: "NotUploaded"
    // });
    expect(cancelDocUpload).toHaveBeenCalledWith(documentKey);
    const rendersCount = DocumentRowComponent.mock.calls.length;
    expect(DocumentRowComponent.mock.calls[rendersCount - 1][0].selectedFile).toBe(null);
    expect(sendProspectToAPI).toHaveBeenCalled();
  });

  it("should handle fileUploadCancel with PERSONAL_BANK_STATEMENTS", () => {
    const document = {
      documentKey,
      documentType: PERSONAL_BANK_STATEMENTS,
      uploadStatus: "some status",
      multiDoc: true
    };
    const stakeholderIndex = "0_stake holder";
    const props = { document, type, index, stakeholderIndex };
    render(<DocumentRow {...props} type={PERSONAL_BANK_STATEMENTS} />);

    expect(DocumentRowComponent).toHaveBeenCalledTimes(1);

    act(() => {
      DocumentRowComponent.mock.calls[0][0].cancelHandler();
    });

    expect(cancelDocUpload).toHaveBeenCalledWith(documentKey);
    const rendersCount = DocumentRowComponent.mock.calls.length;
    expect(DocumentRowComponent.mock.calls[rendersCount - 1][0].selectedFile).toBe(null);
    expect(sendProspectToAPI).toHaveBeenCalled();
  });

  it("should handle fileUploadCancel with PERSONAL_BACKGROUND", () => {
    const document = {
      documentKey,
      documentType: PERSONAL_BACKGROUND,
      uploadStatus: "some status",
      multiDoc: true
    };
    const stakeholderIndex = "0_stake holder";
    const props = { document, type, index, stakeholderIndex };
    render(<DocumentRow {...props} type={PERSONAL_BACKGROUND} />);

    expect(DocumentRowComponent).toHaveBeenCalledTimes(1);

    act(() => {
      DocumentRowComponent.mock.calls[0][0].cancelHandler();
    });

    expect(cancelDocUpload).toHaveBeenCalledWith(documentKey);
    const rendersCount = DocumentRowComponent.mock.calls.length;
    expect(DocumentRowComponent.mock.calls[rendersCount - 1][0].selectedFile).toBe(null);
    expect(sendProspectToAPI).toHaveBeenCalled();
  });

  it("should handle fileUploadCancel with stakeholders docs", () => {
    render(<DocumentRow {...props} type={STAKEHOLDER_DOCUMENTS} />);

    expect(DocumentRowComponent).toHaveBeenCalledTimes(1);

    act(() => {
      DocumentRowComponent.mock.calls[0][0].cancelHandler();
    });

    expect(updateProspect).toHaveBeenCalledWith({
      [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}].documents[${index}].uploadStatus`]: "NotUploaded"
    });
  });

  it("should handle fileUploadCancel with not exepceted docs", () => {
    const type = "some type";
    render(<DocumentRow {...props} type={type} />);

    expect(DocumentRowComponent).toHaveBeenCalledTimes(1);

    act(() => {
      DocumentRowComponent.mock.calls[0][0].cancelHandler();
    });

    expect(updateProspect).toHaveBeenCalledTimes(0);
  });

  it("should handle fileUploadCancel with stakeholders docs", () => {
    const type = "some type";
    render(<DocumentRow {...props} type={type} />);

    expect(DocumentRowComponent).toHaveBeenCalledTimes(1);

    act(() => {
      DocumentRowComponent.mock.calls[0][0].reUploadHandler();
    });

    const rendersCount = DocumentRowComponent.mock.calls.length;
    expect(DocumentRowComponent.mock.calls[rendersCount - 1][0].selectedFile).toBe(null);
  });
});
