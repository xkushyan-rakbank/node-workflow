import {
  RETRIEVE_DOC_UPLOADER,
  DOC_UPLOADER,
  CANCEL_DOC_UPLOAD,
  UPLOAD_FILES_PROGRESS,
  UPLOAD_FILES_FAIL,
  GET_PROSPECT_DOCUMENTS_SUCCESS,
  GET_PROSPECT_DOCUMENTS_FAIL,
  DOWNLOAD_DOCUMENT_FILE,
  ADD_OTHER_DOCUMENT,
  DELETE_OTHER_DOCUMENT,
  retrieveDocDetails,
  docUpload,
  cancelDocUpload,
  uploadFilesProgress,
  uploadFilesFail,
  getProspectDocumentsSuccess,
  getProspectDocumentsFail,
  downloadDocumentFile,
  addOtherDocument,
  deleteOtherDocument
} from "../../../src/store/actions/uploadDocuments";

describe("actions for completedSteps", () => {
  it("should create an action to retrieve document uploader", () => {
    const expectedAction = {
      type: RETRIEVE_DOC_UPLOADER
    };
    expect(retrieveDocDetails()).toEqual(expectedAction);
  });

  it("should create an action to upload documents", () => {
    const payload = {};
    const expectedAction = {
      type: DOC_UPLOADER,
      payload
    };
    expect(docUpload(payload)).toEqual(expectedAction);
  });

  it("should create an action to cancel document uploader", () => {
    const documentKey = "test";
    const expectedAction = {
      type: CANCEL_DOC_UPLOAD,
      payload: { documentKey }
    };
    expect(cancelDocUpload(documentKey)).toEqual(expectedAction);
  });

  it("should create an action to upload file progress", () => {
    const progress = {};
    const expectedAction = {
      type: UPLOAD_FILES_PROGRESS,
      progress
    };
    expect(uploadFilesProgress(progress)).toEqual(expectedAction);
  });

  it("should create an action to upload files fail", () => {
    const error = {};
    const expectedAction = {
      type: UPLOAD_FILES_FAIL,
      error
    };
    expect(uploadFilesFail(error)).toEqual(expectedAction);
  });

  it("should create an action to get succes prospect documents", () => {
    const expectedAction = {
      type: GET_PROSPECT_DOCUMENTS_SUCCESS
    };
    expect(getProspectDocumentsSuccess()).toEqual(expectedAction);
  });

  it("should create an action to get fail prospect documents", () => {
    const expectedAction = {
      type: GET_PROSPECT_DOCUMENTS_FAIL
    };
    expect(getProspectDocumentsFail()).toEqual(expectedAction);
  });

  it("should create an action to download document file", () => {
    const prospectId = "companyInfo";
    const documentKey = "1";
    const fileName = "COMPLETED";
    const expectedAction = {
      type: DOWNLOAD_DOCUMENT_FILE,
      payload: { prospectId, documentKey, fileName }
    };
    expect(downloadDocumentFile(prospectId, documentKey, fileName)).toEqual(expectedAction);
  });

  it("should create an action to add other document", () => {
    const document = {};
    const expectedAction = {
      type: ADD_OTHER_DOCUMENT,
      payload: document
    };
    expect(addOtherDocument(document)).toEqual(expectedAction);
  });

  it("should create an action to delete other document", () => {
    const index = "123";
    const expectedAction = {
      type: DELETE_OTHER_DOCUMENT,
      payload: index
    };
    expect(deleteOtherDocument(index)).toEqual(expectedAction);
  });
});
