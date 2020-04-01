import {
  config,
  SEGMENT,
  dataList,
  authentication,
  OTP_ACTION_GENERATE,
  otp,
  OTP_ACTION_VERIFY,
  prospect,
  getProspectDocuments,
  search,
  screening,
  uploadProspectDocument,
  downloadProspectDocument
} from "../../src/api/apiClient";
import { getQueryString, buildURI } from "../../src/utils/buildURI";

jest.mock("../../src/utils/buildURI");
jest.mock("../../src/api/axiosConfig", () => {
  return {
    __esModule: true,
    default: {
      request: jest.fn(request => request)
    },
    uploadClient: {
      request: jest.fn(request => request)
    }
  };
});

describe("api client test", () => {
  const url = "<some url>";
  const prospectId = "some prospect id";
  const data = "some data";
  const headers = { test: "some header" };

  beforeEach(() => {
    jest.clearAllMocks();
    getQueryString.mockReturnValue("<some query string>");
    buildURI.mockReturnValue(url);
  });

  describe("config test", () => {
    it("should send request for load config", () => {
      const product = "some product";

      expect(config.load(product)).toEqual({
        method: "GET",
        url: "webapply/api/v1/config<some query string>"
      });
      expect(getQueryString).toHaveBeenCalledWith(product, SEGMENT);
    });
  });

  describe("datalist test", () => {
    it("should send request for load datalist", () => {
      const segment = "<some segment>";

      expect(dataList.get(segment)).toEqual({
        method: "GET",
        url: "webapply/api/v1/datalist?segment=<some segment>"
      });
    });
  });

  describe("authentication test", () => {
    it("should send request for login", () => {
      const data = "some data";

      expect(authentication.login(data)).toEqual({
        url,
        method: "POST",
        data
      });
      expect(buildURI).toHaveBeenCalledWith("authenticateUserUri");
    });
  });

  describe("otp test", () => {
    it("should send request for generate otp", () => {
      expect(otp.generate({}, headers)).toEqual({
        url,
        method: "POST",
        data: {
          action: OTP_ACTION_GENERATE
        },
        ...headers
      });
      expect(buildURI).toHaveBeenCalledWith("otpUri");
    });

    it("should send request for verify otp", () => {
      expect(otp.verify({}, headers)).toEqual({
        url,
        method: "POST",
        data: {
          action: OTP_ACTION_VERIFY
        },
        ...headers
      });
      expect(buildURI).toHaveBeenCalledWith("otpUri");
    });
  });

  describe("prospect test", () => {
    it("should send request for create prospect", () => {
      expect(prospect.create(data, headers)).toEqual({
        url,
        method: "POST",
        data,
        ...headers
      });
      expect(buildURI).toHaveBeenCalledWith("createProspectUri");
    });

    it("should send request for update prospect", () => {
      expect(prospect.update(prospectId, data, headers)).toEqual({
        url,
        method: "PUT",
        data,
        ...headers
      });
      expect(buildURI).toHaveBeenCalledWith("updateProspectUri", prospectId);
    });

    it("should send request for get prospect", () => {
      expect(prospect.get(prospectId, headers)).toEqual({
        url,
        method: "GET",
        ...headers
      });
      expect(buildURI).toHaveBeenCalledWith("getProspectUri", prospectId);
    });
  });

  describe("getProspectDocuments test", () => {
    it("should send request for get list of upload documents", () => {
      expect(getProspectDocuments.retriveDocuments(prospectId, headers)).toEqual({
        url,
        method: "GET",
        ...headers
      });
      expect(buildURI).toHaveBeenCalledWith("getProspectDocumentsUri", prospectId);
    });
  });

  describe("search test", () => {
    it("should send request for search applications", () => {
      expect(search.searchApplication(data, headers)).toEqual({
        url,
        data,
        method: "POST",
        ...headers
      });
      expect(buildURI).toHaveBeenCalledWith("searchProspectUri");
    });
  });

  describe("screening test", () => {
    it("should send request for screening prospect", () => {
      expect(screening.send(prospectId)).toEqual({
        url,
        method: "GET"
      });
      expect(buildURI).toHaveBeenCalledWith("screenProspectUri", prospectId);
    });
  });

  describe("uploadProspectDocument test", () => {
    it("should send request for upload documents", () => {
      const cancelToken = "some token";
      const onUploadProgress = () => {};

      expect(
        uploadProspectDocument.send({
          data,
          prospectId,
          source: { token: cancelToken },
          onUploadProgress,
          headers
        })
      ).toEqual({
        url,
        method: "POST",
        data,
        cancelToken,
        onUploadProgress,
        ...headers
      });
      expect(buildURI).toHaveBeenCalledWith("docUploaderUri", prospectId);
    });
  });

  describe("downloadProspectDocument test", () => {
    it("should send request for download document", () => {
      const documentKey = "some document key";

      expect(downloadProspectDocument.get(prospectId, documentKey, headers)).toEqual({
        url,
        method: "GET",
        responseType: "blob",
        ...headers
      });
      expect(buildURI).toHaveBeenCalledWith("getDocumentByIdUri", prospectId, documentKey);
    });
  });
});
