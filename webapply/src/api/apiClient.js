import httpClient from "./axiosConfig";
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
  generate: payload => {
    return httpClient.request({
      url: buildURI("otpUri"),
      method: "POST",
      data: {
        action: OTP_ACTION_GENERATE,
        ...payload
      }
    });
  },
  verify: payload => {
    return httpClient.request({
      url: buildURI("otpUri"),
      method: "POST",
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
  update: (prospectId, data) => {
    return httpClient.request({
      url: buildURI("updateProspectUri", prospectId),
      method: "PUT",
      data
    });
  },
  get: prospectId => {
    return httpClient.request({
      url: buildURI("getProspectUri", prospectId),
      method: "GET"
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
  retriveDocuments: prospectId => {
    return httpClient.request({
      url: buildURI("getProspectDocumentsUri", prospectId),
      method: "GET"
    });
  }
};

export const search = {
  searchApplication: data => {
    return httpClient.request({
      url: buildURI("searchProspectUri"),
      method: "POST",
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
  send: ({ data, prospectId, source, uploadProgressCb }) => {
    return httpClient.request({
      url: buildURI("docUploaderUri", prospectId),
      method: "POST",
      data,
      cancelToken: source.token,
      onUploadProgress: progressEvent => uploadProgressCb(progressEvent)
    });
  }
};
