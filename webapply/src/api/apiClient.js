import httpClient, { uploadClient } from "./axiosConfig";
import { buildURI, getQueryString } from "./../utils/buildURI";

export const OTP_ACTION_GENERATE = "generate";
export const OTP_ACTION_VERIFY = "verify";
export const SEGMENT = "sme";

export const config = {
  load: (product, segment = SEGMENT) => {
    const query = getQueryString(product, segment);
    return httpClient.request({
      method: "GET",
      url: `webapply/api/v1/config${query}`
    });
  }
};

export const dataList = {
  get: segment => {
    return httpClient.request({
      url: `webapply/api/v1/datalist?segment=${segment}`,
      method: "GET"
    });
  }
};

export const authentication = {
  login: data => {
    return httpClient.request({
      url: buildURI("authenticateUserUri"),
      method: "post",
      data
    });
  }
};

export const otp = {
  generate: (payload, headers) => {
    return httpClient.request({
      url: buildURI("otpUri"),
      method: "POST",
      ...headers,
      data: {
        action: OTP_ACTION_GENERATE,
        ...payload
      }
    });
  },
  verify: (payload, headers) => {
    return httpClient.request({
      url: buildURI("otpUri"),
      method: "POST",
      ...headers,
      data: {
        action: OTP_ACTION_VERIFY,
        ...payload
      }
    });
  }
};

export const prospect = {
  create: (data, headers) => {
    return httpClient.request({
      url: buildURI("createProspectUri"),
      method: "POST",
      ...headers,
      data
    });
  },
  update: (prospectId, data, headers) => {
    return httpClient.request({
      url: buildURI("updateProspectUri", prospectId),
      method: "PUT",
      ...headers,
      data
    });
  },
  get: (prospectId, headers) => {
    return httpClient.request({
      url: buildURI("getProspectUri", prospectId),
      method: "GET",
      ...headers
    });
  }
};

export const retrieveApplicantInfos = {
  applicant: data => {
    return httpClient.request({
      url: buildURI("searchProspectUri"),
      method: "post",
      data
    });
  }
};

export const getProspectDocuments = {
  retriveDocuments: (prospectId, headers) => {
    return httpClient.request({
      url: buildURI("getProspectDocumentsUri", prospectId),
      method: "GET",
      ...headers
    });
  }
};

export const search = {
  searchApplication: (data, headers) => {
    return httpClient.request({
      url: buildURI("searchProspectUri"),
      method: "POST",
      ...headers,
      data
    });
  }
};

export const screening = {
  send: prospectId =>
    httpClient.request({
      url: buildURI("screenProspectUri", prospectId),
      method: "GET"
    })
};

export const uploadProspectDocument = {
  send: ({ data, prospectId, source, onUploadProgress, headers }) => {
    return uploadClient.request({
      url: buildURI("docUploaderUri", prospectId),
      method: "POST",
      ...headers,
      data,
      cancelToken: source.token,
      onUploadProgress
    });
  }
};

export const downloadProspectDocument = {
  get: (prospectId, documentKey, headers) => {
    return uploadClient.request({
      url: buildURI("getDocumentByIdUri", prospectId, documentKey),
      method: "GET",
      responseType: "blob",
      ...headers
    });
  }
};
