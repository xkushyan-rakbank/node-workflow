import reducer, { initialState } from "../../../src/store/reducers/getProspectDocuments";
import {
  retrieveDocDetails,
  docUpload,
  uploadFilesProgress,
  uploadFilesFail,
  getProspectDocumentsSuccess,
  getProspectDocumentsFail
} from "../../../src/store/actions/getProspectDocuments";

describe("applicant info form reducer test", () => {
  it("should create reducer to doc uploader", () => {
    const payload = { documentKey: 1 };
    const expectedState = {
      ...initialState,
      uploadErrors: { ...initialState.uploadErrors, [payload.documentKey]: null }
    };
    expect(reducer(initialState, docUpload(payload))).toStrictEqual(expectedState);
  });

  it("should create reducer to doc upload files progress", () => {
    const progress = {};
    const expectedState = {
      ...initialState,
      progress: { ...initialState.progress, ...progress }
    };
    expect(reducer(initialState, uploadFilesProgress(progress))).toStrictEqual(expectedState);
  });

  it("should create reducer to upload files fail", () => {
    const error = { a: 1 };
    const expectedState = {
      ...initialState,
      uploadErrors: { ...initialState.uploadErrors, ...error }
    };
    expect(reducer(initialState, uploadFilesFail(error))).toStrictEqual(expectedState);
  });

  it("should create reducer to retrieve doc details", () => {
    const expectedState = {
      ...initialState,
      isLoading: true
    };
    expect(reducer(initialState, retrieveDocDetails())).toStrictEqual(expectedState);
  });

  it("should create reducer to upload files fail", () => {
    const expectedState = {
      ...initialState,
      isLoading: false
    };
    expect(reducer(initialState, getProspectDocumentsSuccess())).toStrictEqual(expectedState);
  });

  it("should create reducer to upload files fail", () => {
    const expectedState = {
      ...initialState,
      isLoading: true
    };
    expect(reducer(initialState, getProspectDocumentsFail())).toStrictEqual(expectedState);
  });
});
