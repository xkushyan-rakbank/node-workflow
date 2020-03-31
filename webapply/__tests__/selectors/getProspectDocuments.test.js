import {
  getUploadDocuments,
  getisLoadingDocuments,
  getIsRequiredDocsUploaded,
  getOtherDocuments,
  getProgress,
  getProspectDocuments,
  getUploadErrors
} from "../../src/store/selectors/getProspectDocuments";

describe("getProspectDocuments selector test", () => {
  const progress = "some progress";
  const uploadErrors = "some uploadErrors";
  const uploadDocuments = {
    progress,
    uploadErrors,
    isLoading: true
  };
  const companyDocuments = [{ uploadStatus: "Uploaded" }, { uploadStatus: "Uploaded" }];
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
    expect(getProspectDocuments({ appConfig: { prospect: {} } })).toEqual({});
  });

  it("should return prospect documents", () => {
    expect(getProspectDocuments(state)).toEqual(documents);
  });

  it("should return empty array when otherDocuments is not set", () => {
    expect(getOtherDocuments({ appConfig: { prospect: { documents: {} } } })).toEqual([]);
  });

  it("should return other documents array", () => {
    expect(getOtherDocuments(state)).toEqual(otherDocuments);
  });

  it("should return are documents loading", () => {
    expect(getisLoadingDocuments(state)).toBe(true);
  });

  it("should return are all required docs uploaded", () => {
    expect(getIsRequiredDocsUploaded(state)).toBe(true);
  });
});
