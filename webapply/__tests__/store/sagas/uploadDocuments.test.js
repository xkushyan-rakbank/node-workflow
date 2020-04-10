import { saveAs } from "file-saver";
import { runSaga, END } from "redux-saga";
import set from "lodash/set";

import uploadDocumentsSaga, {
  downloadDocumentFileSaga,
  deleteOtherDocumentSaga,
  addOtherDocumentSaga,
  uploadDocumentsFlowSaga,
  saveProspectAndGetProspectDocumentsSaga,
  uploadProgressWatcher,
  createUploader
} from "../../../src/store/sagas/uploadDocuments";
import {
  SAVE_AND_RETRIEVE_DOC_UPLOADER,
  RETRIEVE_DOC_UPLOADER,
  DOC_UPLOADER,
  ADD_OTHER_DOCUMENT,
  DELETE_OTHER_DOCUMENT,
  DOWNLOAD_DOCUMENT_FILE,
  CANCEL_DOC_UPLOAD,
  uploadFilesProgress
} from "../../../src/store/actions/uploadDocuments";
import { getAuthorizationHeader, getAppConfig } from "../../../src/store/selectors/appConfig";
import { downloadProspectDocument, uploadProspectDocument } from "../../../src/api/apiClient";
import { log } from "../../../src/utils/loggger";
import { setConfig } from "../../../src/store/actions/appConfig";
import {
  sendProspectToAPI,
  SEND_PROSPECT_TO_API_SUCCESS,
  SEND_PROSPECT_TO_API_FAIL
} from "../../../src/store/actions/sendProspectToAPI";

jest.mock("../../../src/store/selectors/appConfig");
jest.mock("file-saver");
jest.mock("../../../src/utils/loggger");
jest.mock("../../../src/store/actions/appConfig");
jest.mock("../../../src/store/actions/sendProspectToAPI");
jest.mock("../../../src/store/actions/uploadDocuments");

describe("uploadDocumentSaga test", () => {
  const headers = "some headers";
  const data = { data: "some data", type: "some type" };
  const prospectId = "some prospect id";
  const documentKey = "some document key";
  const fileName = "some file name";
  const error = "some error";
  const action = { type: "some action type" };
  let dispatched = [];
  const state = "some state";
  const store = {
    dispatch: action => dispatched.push(action),
    getState: () => state
  };

  beforeEach(() => {
    dispatched = [];
  });

  beforeAll(() => {
    getAuthorizationHeader.mockReturnValue(headers);
    saveAs.mockReturnValue(null);
    log.mockReturnValue(null);
    setConfig.mockReturnValue(action);
    sendProspectToAPI.mockReturnValue(action);
    uploadFilesProgress.mockReturnValue(action);
  });

  it("should handle upload documents saga", () => {
    const gen = uploadDocumentsSaga().next().value;
    expect(gen.type).toEqual("ALL");
    expect(gen.payload[0].payload.args[0]).toEqual(SAVE_AND_RETRIEVE_DOC_UPLOADER);
    expect(gen.payload[1].payload.args[0]).toEqual(RETRIEVE_DOC_UPLOADER);
    expect(gen.payload[2].payload.args[0]).toEqual(DOC_UPLOADER);
    expect(gen.payload[3].payload.args[0]).toEqual(ADD_OTHER_DOCUMENT);
    expect(gen.payload[4].payload.args[0]).toEqual(DELETE_OTHER_DOCUMENT);
    expect(gen.payload[5].payload.args[0]).toEqual(DOWNLOAD_DOCUMENT_FILE);
  });

  it("should save file", async () => {
    const payload = { prospectId, documentKey, fileName };
    const spy = jest.spyOn(downloadProspectDocument, "get").mockReturnValue({ data });

    await runSaga(store, downloadDocumentFileSaga, { payload }).toPromise();
    expect(getAuthorizationHeader).toBeCalledWith(state);
    expect(spy).toBeCalledWith(prospectId, documentKey, headers);
    expect(saveAs).toBeCalledWith(expect.any(Blob), fileName);

    spy.mockRestore();
  });

  it("should log error when save file failed", async () => {
    const payload = { prospectId, documentKey, fileName };
    const spy = jest.spyOn(downloadProspectDocument, "get").mockImplementation(() => {
      throw error;
    });

    await runSaga(store, downloadDocumentFileSaga, { payload }).toPromise();
    expect(getAuthorizationHeader).toBeCalledWith(state);
    expect(log).toBeCalledWith(error);

    spy.mockRestore();
  });

  it("should handle set new config action which include `otherDocuments` filter by `documentKey`", async () => {
    const config = {};
    set(config, "prospect.documents.otherDocuments", [{ documentKey }]);
    getAppConfig.mockReturnValue(config);

    await runSaga(store, deleteOtherDocumentSaga, { payload: documentKey }).toPromise();

    set(config, "prospect.documents.otherDocuments", []);
    expect(setConfig).toBeCalledWith(config);
    expect(dispatched).toEqual([action]);
  });

  it("should handle set new config action which include `otherDocuments` concat with new document", async () => {
    const config = {};
    set(config, "prospect.documents.otherDocuments", []);
    getAppConfig.mockReturnValue(config);

    await runSaga(store, addOtherDocumentSaga, { payload: { documentKey } }).toPromise();

    set(config, "prospect.documents.otherDocuments", [{ documentKey }]);
    expect(setConfig).toBeCalledWith(config);
    expect(dispatched).toEqual([action]);
  });

  it("should race flow when call `uploadDocumentsFlowSaga`", () => {
    const payload = { documentKey };
    const gen = uploadDocumentsFlowSaga({ payload }).next().value;

    expect(gen.type).toEqual("RACE");
    expect(gen.payload.task.payload.args).toEqual([payload]);
    expect(
      gen.payload.cancel.payload.pattern({ type: CANCEL_DOC_UPLOAD, payload: { documentKey } })
    ).toBe(true);
  });

  it("should save prospect and get prospect documents", () => {
    const gen = saveProspectAndGetProspectDocumentsSaga();
    expect(gen.next().value).toMatchObject({
      type: "PUT",
      payload: {
        action
      }
    });
    expect(gen.next().value).toMatchObject({
      type: "RACE",
      payload: [
        {
          type: "TAKE",
          payload: { pattern: SEND_PROSPECT_TO_API_SUCCESS }
        },
        {
          type: "TAKE",
          payload: { pattern: SEND_PROSPECT_TO_API_FAIL }
        }
      ]
    });
    expect(gen.next().value).toMatchObject({
      type: "CALL"
    });
  });

  it("should handle upload progress action", async () => {
    const progress = 10;
    const chan = {
      take: jest
        .fn()
        .mockImplementationOnce(cb => cb(progress))
        .mockImplementationOnce(cb => cb(END)),
      close: jest.fn()
    };
    await runSaga(store, uploadProgressWatcher, chan, documentKey);

    expect(dispatched).toEqual([action]);
  });

  it("should create file uploader", () => {
    const uploadPromise = "some promise";
    const source = "some source";

    const spy = jest.spyOn(uploadProspectDocument, "send").mockReturnValue(uploadPromise);

    const result = createUploader(prospectId, data, source, headers);
    expect(result[0]).toBe(uploadPromise);
    expect(spy.mock.calls[0][0]).toMatchObject({ prospectId, data, source, headers });
    result[1].take(data => expect(data).toBe(0));
    spy.mock.calls[0][0].onUploadProgress({ total: 1, loaded: 0 });
    result[1].take(data => expect(data).toBe(100));
    spy.mock.calls[0][0].onUploadProgress({ total: 1, loaded: 1 });

    spy.mockRestore();
  });
});
