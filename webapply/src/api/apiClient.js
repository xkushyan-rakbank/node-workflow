import httpClient, { uploadClient } from "./axiosConfig";
import { buildURI, getQueryString } from "./../utils/buildURI";

export const OTP_ACTION_GENERATE = "generate";
export const OTP_ACTION_VERIFY = "verify";

export const config = {
  load: (product, segment) => {
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
  generate: (payload, authToken) => {
    return httpClient.request({
      url: buildURI("otpUri"),
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        action: OTP_ACTION_GENERATE,
        ...payload
      }
    });
  },
  verify: (payload, authToken) => {
    return httpClient.request({
      url: buildURI("otpUri"),
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        action: OTP_ACTION_VERIFY,
        ...payload
      }
    });
  }
};

export const prospect = {
  create: data => {
    return httpClient.request({
      url: buildURI("createProspectUri"),
      method: "POST",
      data
    });
  },
  update: (prospectId, data, authToken) => {
    return httpClient.request({
      url: buildURI("updateProspectUri", prospectId),
      method: "PUT",
      headers: { Authorization: `Bearer ${authToken}` },
      data
    });
  },
  get: (prospectId, authToken) => {
    return httpClient.request({
      url: buildURI("getProspectUri", prospectId),
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` }
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
  retriveDocuments: (prospectId, authToken) => {
    return httpClient.request({
      url: buildURI("getProspectDocumentsUri", prospectId),
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` }
    });
  }
};

export const search = {
  searchApplication: (data, authToken) => {
    return httpClient.request({
      url: buildURI("searchProspectUri"),
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
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
  send: ({ data, prospectId, source, onUploadProgress, authToken }) => {
    return uploadClient.request({
      url: buildURI("docUploaderUri", prospectId),
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
      data,
      cancelToken: source.token,
      onUploadProgress
    });
  }
};
