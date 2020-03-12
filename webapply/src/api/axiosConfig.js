import axios from "axios";
import get from "lodash/get";
import nanoid from "nanoid";

import { store } from "../store";
import { setAccessToken } from "../store/actions/appConfig";

import { NotificationsManager } from "../components/Notification";

import { encrypt, decrypt } from "./crypto";
import { log } from "../utils/loggger";
import { formatJsonData } from "./formatJsonData";
import { IGNORE_ERROR_CODES, HANDLED_ERROR_CODES } from "../constants";
import {
  ErrorOccurredWhilePerforming,
  ReCaptchaError,
  FieldsValidationError
} from "./serverErrors";

const SYM_KEY_HEADER = "x-sym-key";
const REQUEST_ID_HEADER = "x-request-id";
const ENCRYPT_METHODS = ["post", "put"];
const ENCRYPTION_ENABLE = process.env.REACT_APP_ENCRYPTION_ENABLE || "N";
const rsaPublicKey = process.env.REACT_APP_RSA_PUBLIC_KEY;
const encryptionEnabled = ENCRYPTION_ENABLE === "Y";

export const uploadClient = axios.create({
  baseURL: process.env.REACT_APP_UPLOAD_PATH || "https://uatrmtc.rakbankonline.ae"
});

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_PATH || "http://conv.rakbankonline.ae/quickapply"
});

apiClient.interceptors.request.use(config => ({
  ...config,
  headers: {
    ...config.headers,
    [REQUEST_ID_HEADER]: nanoid()
  }
}));

apiClient.interceptors.request.use(config => {
  if (encryptionEnabled && rsaPublicKey && ENCRYPT_METHODS.includes(config.method.toLowerCase())) {
    const [encryptedPayload, encryptedSymKey, symKey] = encrypt(
      rsaPublicKey,
      JSON.stringify(config.data)
    );

    return {
      ...config,
      headers: {
        ...config.headers,
        "Content-Type": "application/json",
        [SYM_KEY_HEADER]: encryptedSymKey
      },
      data: encryptedPayload,
      symKey
    };
  }

  return config;
});

[apiClient, uploadClient].forEach(instance => {
  instance.interceptors.response.use(response => {
    const accessToken = response.headers.accesstoken || response.headers.AccessToken;

    if (accessToken) {
      store.dispatch(setAccessToken(accessToken));
    }

    return response;
  });
});

apiClient.interceptors.response.use(
  response => {
    const { symKey } = response.config;

    if (symKey && response.data && typeof response.data === "string") {
      let payload;

      try {
        payload = decrypt(symKey, response.data).data;
      } catch (e) {
        log({ e, symKey, data: response.data });
      }

      try {
        if (payload) {
          return {
            ...response,
            data: JSON.parse(payload)
          };
        }
      } catch (e) {
        log({ e, payload });
      }
    }

    return response;
  },
  error => {
    const {
      status,
      data,
      config: { symKey }
    } = error.response;

    let jsonData = data;

    if (symKey && data && typeof data === "string") {
      let payload;

      try {
        payload = decrypt(symKey, data).data;
      } catch (e) {
        log({ e, symKey, data });
      }

      try {
        if (payload) {
          jsonData = JSON.parse(payload);
        }
      } catch (e) {
        log({ e, payload });
      }
    }

    let notificationOptions = {};
    let serverError = null;

    if (jsonData) {
      const { errors, errorType } = jsonData;
      if (status === 400 && errorType === "ReCaptchaError") {
        serverError = new ReCaptchaError(jsonData);
        notificationOptions = { title: "ReCaptchaError", message: errors };
      } else if (status === 400 && errors) {
        if (HANDLED_ERROR_CODES.includes(errors[0].errorCode)) {
          serverError = new ErrorOccurredWhilePerforming(jsonData);
          notificationOptions = null;
        } else if (errorType === "FieldsValidation") {
          serverError = new FieldsValidationError(jsonData);
          notificationOptions = {
            title: "Validation Error On Server",
            message: get(jsonData, "errors[0].message", "Validation Error")
          };
        }
      } else {
        log(jsonData);
        try {
          if (jsonData.status) {
            if (IGNORE_ERROR_CODES.includes(errors[0].errorCode)) {
              notificationOptions = null;
            } else {
              const errorMessages = errors.map(({ message }) => message);
              const debugNotificationOptions = formatJsonData(jsonData);

              notificationOptions = {
                message: errorMessages.join(", "),
                ...debugNotificationOptions
              };
            }
          }
        } catch (e) {
          log(e);
        }
      }
    }

    if (notificationOptions && NotificationsManager.add) {
      NotificationsManager.add(notificationOptions);
    }

    return Promise.reject(serverError || error);
  }
);

export default apiClient;
