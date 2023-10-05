import httpClient, {
  configureKYCTransactionAPIClient,
  getKYCTransactionAPIClientInstance,
  uploadClient
} from "./axiosConfig";
import { buildURI } from "./../utils/buildURI";

export const OTP_ACTION_GENERATE = "generate";
export const OTP_ACTION_VERIFY = "verify";
export const SEGMENT = "sme";

export const config = {
  load: () => {
    return httpClient.request({
      method: "GET",
      url: "onboarding/config/accounts"
    });
  }
};

export const dataList = {
  get: segment =>
    httpClient.request({
      url: `webapply/api/v1/datalist?segment=${segment}`,
      method: "GET"
    })
};

export const authentication = {
  login: data =>
    httpClient.request({
      url: buildURI("authenticateUserUri"),
      method: "POST",
      data
    })
};

export const otp = {
  generate: (payload, headers) =>
    httpClient.request({
      url: buildURI("otpUri"),
      method: "POST",
      ...headers,
      data: {
        //action: OTP_ACTION_GENERATE,
        ...payload
      }
    }),
  verify: (payload, headers) =>
    httpClient.request({
      url: buildURI("otpUri"),
      method: "POST",
      ...headers,
      data: {
        action: OTP_ACTION_VERIFY,
        ...payload
      }
    })
};

export const prospect = {
  create: ({ applicantInfo }, headers) =>
    httpClient.request({
      url: buildURI("createProspectUri"),
      method: "POST",
      ...headers,
      data: { applicantInfo }
    }),
  update: (prospectId, data, headers) =>
    httpClient.request({
      url: buildURI("updateProspectUri", prospectId),
      method: "PATCH",
      ...headers,
      data
    }),
  get: (prospectId, headers) =>
    httpClient.request({
      url: buildURI("getProspectUri", prospectId),
      method: "GET",
      ...headers
    })
};

export const getProspectDocuments = {
  retriveDocuments: (prospectId, headers) =>
    httpClient.request({
      url: buildURI("getProspectDocumentsUri", prospectId),
      method: "GET",
      ...headers
    })
};

export const search = {
  searchApplication: (data, headers) =>
    httpClient.request({
      url: buildURI("searchProspectUri"),
      method: "POST",
      ...headers,
      data
    })
};

export const screening = {
  send: prospectId =>
    httpClient.request({
      url: buildURI("screenProspectUri", prospectId),
      method: "GET"
    })
};

export const uploadProspectDocument = {
  send: ({ data, prospectId, source, onUploadProgress, headers }) =>
    uploadClient.request({
      url: buildURI("docUploaderUri", prospectId),
      method: "POST",
      ...headers,
      data,
      cancelToken: source.token,
      onUploadProgress
    })
};

export const downloadProspectDocument = {
  get: (prospectId, documentKey, headers) =>
    uploadClient.request({
      url: buildURI("getDocumentByIdUri", prospectId, documentKey),
      method: "GET",
      responseType: "blob",
      ...headers
    })
};

// ro-assist-brd3-1
export const createInvite = {
  send: (data, headers) =>
    httpClient.request({
      url: buildURI("createInviteUri"),
      method: "POST",
      ...headers,
      data
    })
};

export const decisions = {
  make: (prospectId, data, headers) =>
    httpClient.request({
      url: buildURI("prospectDecisions", prospectId),
      method: "POST",
      ...headers,
      data
    }),
  get: (prospectId, headers) =>
    httpClient
      .request({
        url: buildURI("prospectDecisions", prospectId),
        method: "GET",
        ...headers
      })
      .then(response => {
        return response;
      })
};

export const createKYCTransaction = {
  send: (prospectId, individualId, reuseExistingTransaction, headers) =>
    httpClient
      .request({
        url: buildURI("createKYCTransactionUri"), //webapply/products/sme/kyc-transactions
        method: "POST",
        ...headers,
        data: { prospectId, individualId, reuseExistingTransaction }
      })
      .then(response => {
        const {
          data: { kycUserToken, kycTransactionId }
        } = response;
        configureKYCTransactionAPIClient(kycTransactionId, kycUserToken);
        return response;
      })
};

export const getSdkConfiguration = {
  get: transactionId => {
    const kycTransactionClient = getKYCTransactionAPIClientInstance(transactionId);
    return kycTransactionClient
      .request({
        url: "efr/sdk-configuration",
        method: "GET"
      })
      .then(response => {
        return response.data.data;
      });
  }
};

export const analyzeOcrData = {
  send: async (transactionId, ocrData, headers, documentType) => {
    const kycTransactionClient = await getKYCTransactionAPIClientInstance(transactionId);
    return kycTransactionClient
      .request({
        url: "/efr/transactions/" + transactionId + "/ocr", //webapply/products/sme/kyc-transactions
        method: "POST",
        data: {
          bundleId: "com.rak",
          document: ocrData.docFront,
          documentBack: ocrData.docBack,
          documentType
        },
        ...headers
      })
      .then(response => {
        return response.data;
      });
  },
  getFaceScanKey: transactionId => {
    const kycTransactionClient = getKYCTransactionAPIClientInstance(transactionId);
    return kycTransactionClient
      .request({
        url: "efr/temporary-key",
        method: "GET"
      })
      .then(response => {
        return response.data;
      });
  },
  postFaceLiveliness: (transactionId, livenessData) => {
    const kycTransactionClient = getKYCTransactionAPIClientInstance(transactionId);
    return kycTransactionClient
      .post("efr/transactions/" + transactionId + "/liveness", livenessData, {
        headers: {
          "Content-Type": "text/plain"
        }
      })
      .then(function(response) {
        return response.data;
      });
  },
  validateAndConfirmIdentity: (transactionId, faceData, imageHash) => {
    const kycTransactionClient = getKYCTransactionAPIClientInstance(transactionId);
    return kycTransactionClient
      .post(
        "efr/transactions/" + transactionId + "/identity",
        {
          faceData,
          imageHash
        },
        {
          headers: {
            "X-Recaptcha-Token":
              "03AGdBq25uLcqQmoufID-aCqfzV_wEOYl63bo92SDoA6R8NGE-FFkhlREI28Akm04ryxnbY29ydjyYumT5xBqllUXODFW_GSlSOhJZd43CjLhyBlsVDk1GzHs_aFeYfwvBRkkRgMqW-CLJ9VCOLgqyYy7KDhcmkg-Ox0gPIjgD8KGIBWbhekzGIiuawj_XD4cEkzEAJy5F_rtFzUt_C48HgptUfLq5CWjyPGxWBqWSWyXaKEuTHKTl1LGoCG0CF8yL6PG0Gtqi7KRk2i1K7LTw7UxOYu9GcxIj2qfsMj2ya_NdYQAdmIrlq4LjYOP49nKp5EbXzhDG0JQH6Pb8kFCt_S2MCI3u86Zyu4zqZv1ZturlDajTKoze7MaQUjCbXHTiqMsUcUCnq22LeLzHTcZ_FcEsAVbjsUZSM0gQk8q4M7uBNzQdF9ZO9Vi5y40fBtkJCiObo2sh82yL07tfuXpQpN7JYBqXEKGEOA"
          }
        }
      )
      .then(function(response) {
        return response.data;
      });
  },
  entityConfirmation: (transactionId, faceData, imageHash, data) => {
    const kycTransactionClient = getKYCTransactionAPIClientInstance(transactionId);
    return kycTransactionClient
      .post("efr/transactions/" + transactionId + "/confirm-entity", data, {
        headers: {
          "X-Recaptcha-Token":
            "03AGdBq25uLcqQmoufID-aCqfzV_wEOYl63bo92SDoA6R8NGE-FFkhlREI28Akm04ryxnbY29ydjyYumT5xBqllUXODFW_GSlSOhJZd43CjLhyBlsVDk1GzHs_aFeYfwvBRkkRgMqW-CLJ9VCOLgqyYy7KDhcmkg-Ox0gPIjgD8KGIBWbhekzGIiuawj_XD4cEkzEAJy5F_rtFzUt_C48HgptUfLq5CWjyPGxWBqWSWyXaKEuTHKTl1LGoCG0CF8yL6PG0Gtqi7KRk2i1K7LTw7UxOYu9GcxIj2qfsMj2ya_NdYQAdmIrlq4LjYOP49nKp5EbXzhDG0JQH6Pb8kFCt_S2MCI3u86Zyu4zqZv1ZturlDajTKoze7MaQUjCbXHTiqMsUcUCnq22LeLzHTcZ_FcEsAVbjsUZSM0gQk8q4M7uBNzQdF9ZO9Vi5y40fBtkJCiObo2sh82yL07tfuXpQpN7JYBqXEKGEOA"
        }
      })
      .then(function(response) {
        return response.data;
      });
  },
  notifyHost: transactionId => {
    const kycTransactionClient = getKYCTransactionAPIClientInstance(transactionId);
    return kycTransactionClient
      .patch("v3/efr/transactions/" + transactionId + "/notify-host", {})
      .then(function(response) {
        return response.data;
      });
  }
};

export const getOCRDataStatus = {
  getOCRStatus: transactionId => {
    const kycTransactionClient = getKYCTransactionAPIClientInstance(transactionId);
    return kycTransactionClient
      .get("efr/transactions/" + transactionId + "/stages")
      .then(function(response) {
        return response.data;
      });
  },
  getOCRStageData: (transactionId, stage) => {
    const kycTransactionClient = getKYCTransactionAPIClientInstance(transactionId);
    return kycTransactionClient
      .get(`efr/transactions/${transactionId}/stages/${stage}/details`)
      .then(function(response) {
        return response.data;
      });
  }
};

export const documents = {
  requestClientToken: headers =>
    httpClient.request({
      url: buildURI("documentUploaderToken"),
      method: "POST",
      ...headers
    }),
  getDocumentList: (prospectId, headers) =>
    httpClient.request({
      url: buildURI("getProspectDocumentsUri", prospectId),
      method: "GET",
      ...headers
    }),
  upload: (fileData, jwtToken, prospectId, headers) => {
    const data = new FormData();
    data.append("documentType", fileData.documentType);
    data.append("documentTitle", fileData.documentTitle);
    data.append("fileName", fileData.fileName);
    data.append("fileFormat", fileData.fileFormat);
    data.append("fileSize", fileData.fileSize);
    data.append("jwt", jwtToken);
    data.append("uploadfile", fileData.file);
    return uploadClient.request({
      url: buildURI("uploadDocumentUri", prospectId),
      method: "POST",
      ...headers,
      data
    });
  }
};

export const webToMobile = {
  generateQRCode: (prospectId, data, headers) =>
    httpClient
      .request({
        url: buildURI("generateWebToMobileQRCode", prospectId),
        method: "POST",
        ...headers,
        data
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.log("error while generating QR code", err.message);
      }),
  refreshQRCode: (prospectId, webToMobileRefId, data, headers) =>
    httpClient
      .request({
        url: buildURI("refreshWebToMobileQRCode", prospectId, null, webToMobileRefId),
        method: "POST",
        ...headers,
        data
      })
      .then(response => {
        return response.data;
      })
      .catch(err => console.log("error while refreshing QR code", err.message)),
  wtmSyncSession: (data, headers) =>
    httpClient.request({
      url: buildURI("wtmSyncSession"),
      method: "POST",
      ...headers,
      data
    }),
  wtmStatusUpdate: (data, headers, prospectId, webtobomrefId) => {
    return httpClient
      .request({
        url: buildURI("wtmStatusUpdate", prospectId, "", webtobomrefId),
        method: "PATCH",
        ...headers,
        data
      })
      .then(response => {
        return response.data;
      })
      .catch(err => console.log("update status", err.message));
  },
  checkQRCodeStatus: (prospectId, webToMobileRefId, header) =>
    httpClient
      .request({
        url: buildURI("wtmStatusUpdate", prospectId, null, webToMobileRefId),
        method: "GET",
        ...header
      })
      .then(response => {
        return response.data;
      })
      .catch(err => console.log("error while calling poll", err.message))
};

export const kfsAcknowledgement = {
  sendMail: (body, headers) =>
    httpClient
      .request({
        url: buildURI("cpfSendEmailUrl"),
        method: "POST",
        ...headers,
        data: body
      })
      .then(response => {
        return response.data;
      })
};

export const sendEFRInvite = {
  sendMail: (prospectId, body, headers) =>
    httpClient.request({
      url: buildURI("sendEFRInvite", prospectId),
      method: "POST",
      ...headers,
      data: body
    })
};

export const cpfCustomerConsent = {
  send: (body, headers) =>
    httpClient
      .request({
        url: buildURI("cpfCustomerConsentUrl"),
        method: "POST",
        ...headers,
        data: body
      })
      .then(response => {
        return response.data;
      })
};
