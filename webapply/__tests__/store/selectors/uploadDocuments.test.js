import {
  getUploadDocuments,
  getIsLoadingDocuments,
  getProgress,
  getUploadErrors
} from "../../../src/store/selectors/uploadDocuments";
import {
  checkIfRequiredDocsUploaded,
  getIsRequiredDocsUploaded,
  getOtherDocuments,
  getDocuments,
  getCompanyDocuments,
  getStakeholdersDocuments
} from "../../../src/store/selectors/appConfig";

import {
  COMPANY_BANK_STATEMENTS_DOCTYPE,
  COMPANY_ADDRESS_PROOF_DOCTYPE,
  COMPANY_INVOICES_DOCTYPE,
  PERSONAL_BANK_STATEMENTS_DOCTYPE,
  PERSONAL_BACKGROUND_DOCTYPE
} from "../../../src/constants";

describe("getProspectDocuments selector test", () => {
  const progress = "some progress";
  const uploadErrors = "some uploadErrors";
  const uploadDocuments = {
    progress,
    uploadErrors,
    isLoading: true
  };
  const companyDocuments = [
    { uploadStatus: "Uploaded", required: true },
    { uploadStatus: "Uploaded", required: true }
  ];
  const stakeholdersDocuments = {
    O_: { documents: [{ uploadStatus: "Uploaded" }, { uploadStatus: "Uploaded" }] }
  };
  const otherDocuments = ["other documents"];
  const documents = {
    companyDocuments,
    stakeholdersDocuments,
    otherDocuments
  };
  const state = { uploadDocuments, appConfig: { prospect: { documents } } };

  it("should return upload documents", () => {
    expect(getUploadDocuments(state)).toEqual(uploadDocuments);
  });

  it("should return progress", () => {
    expect(getProgress(state)).toBe(progress);
  });

  it("should return upload errors", () => {
    expect(getUploadErrors(state)).toEqual(uploadErrors);
  });

  it("should return empty object when documents is not set", () => {
    expect(getDocuments({ appConfig: { prospect: {} } })).toEqual({});
  });

  it("should return prospect documents", () => {
    expect(getDocuments(state)).toEqual(documents);
  });

  it("should return empty array when otherDocuments is not set", () => {
    expect(getOtherDocuments({ appConfig: { prospect: { documents: {} } } })).toEqual([]);
  });

  it("should return other documents array", () => {
    expect(getOtherDocuments(state)).toEqual(otherDocuments);
  });

  it("should return are documents loading", () => {
    expect(getIsLoadingDocuments(state)).toBe(true);
  });

  it("should return are all required docs have upload status Uploaded", () => {
    expect(checkIfRequiredDocsUploaded(companyDocuments)).toBe(true);
  });

  it("should return are all required docs was uploaded", () => {
    expect(getIsRequiredDocsUploaded(state)).toBe(true);
  });

  it("should return 0 when companyDocuments and stakeholdersDocuments is not exists", () => {
    expect(getIsRequiredDocsUploaded({ appConfig: { prospect: { documents: {} } } })).toBe(0);
  });

  it("should return true when all documents are submited", () => {
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
        documents: [{ documentType: COMPANY_INVOICES_DOCTYPE }]
      },
      stakeholdersDocuments: {
        "0_stake holder": {
          documents: [],
          personalBankStatements: {
            limit: 6,
            documents: [{ documentType: PERSONAL_BANK_STATEMENTS_DOCTYPE }]
          },
          personalBackground: {
            limit: 1,
            documents: [{ documentType: PERSONAL_BACKGROUND_DOCTYPE }]
          }
        }
      },
      otherDocuments: []
    };
    expect(
      getIsRequiredDocsUploaded({ appConfig: { prospect: { documents: documentsArr } } })
    ).toBe(true);
  });

  it("should return true when validRocode is true", () => {
    expect(
      getIsRequiredDocsUploaded({
        appConfig: { prospect: { applicantInfo: { validRoCode: "Y" } } }
      })
    ).toBe(true);
  });

  it("should return company documents", () => {
    expect(getCompanyDocuments(state)).toBe(companyDocuments);
  });

  it("should return empty array when company documents is not set", () => {
    const mockState = { uploadDocuments, appConfig: { prospect: { documents: {} } } };

    expect(getCompanyDocuments(mockState)).toEqual([]);
  });

  it("should return stakeholders documents", () => {
    expect(getStakeholdersDocuments(state)).toBe(stakeholdersDocuments);
  });

  it("should return empty array when stakeholders documents is not set", () => {
    const mockState = { uploadDocuments, appConfig: { prospect: { documents: {} } } };

    expect(getStakeholdersDocuments(mockState)).toEqual([]);
  });
});
