import axios from "axios";

import { store } from "../store";
import { setInputsErrors } from "../store/actions/serverValidation";
import { setError } from "../store/actions/reCaptcha";
import { setAccessToken } from "../store/actions/appConfig";
import { NotificationsManager } from "../components/Notification";
import { encrypt, decrypt } from "./crypto";
import { log } from "../utils/loggger";
import { IGNORE_ERROR_CODES } from "../constants";

const SYM_KEY_HEADER = "x-sym-key";
const ENCRYPT_METHODS = ["post", "put"];
const ENCRYPTION_ENABLE = process.env.REACT_APP_ENCRYPTION_ENABLE || "N";
const encryptionEnabled = ENCRYPTION_ENABLE === "Y";

const getBaseURL = () =>
  process.env.REACT_APP_API_PATH || "http://conv.rakbankonline.ae/quickapply";

export const uploadClient = axios.create({
  baseURL: "https://uatrmtc.rakbankonline.ae"
});

const instance = axios.create({
  baseURL: getBaseURL()
});

instance.interceptors.request.use(config => {
  const { rsaPublicKey } = store.getState().appConfig;

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

instance.interceptors.response.use(response => {
  const accessToken = get(response, "headers.accesstoken") || get(response, "headers.AccessToken");
  if (accessToken) store.dispatch(setAccessToken(accessToken));
  return response;
});

instance.interceptors.response.use(
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

    const addErrorToNotification = options => {
      NotificationsManager.add && NotificationsManager.add(options);
    };

    if (jsonData) {
      try {
        const { errorType, errors } = JSON.parse(jsonData.debugMessage);
        switch (errorType) {
          case "FieldsValidation":
            if (errors) {
              store.dispatch(setInputsErrors(errors));
              errors.forEach(error => {
                addErrorToNotification({
                  title: "Validation Error On Server",
                  message: error.message || "Validation Error"
                });
              });
            }
            break;
          case "OTP":
            addErrorToNotification({
              title: "OTP error",
              message: "Something wrong with OTP"
            });
            break;
          case "ReCaptchaError":
            store.dispatch(setError(errors));
            addErrorToNotification({
              title: "ReCaptchaError",
              message: data.errors
            });
            break;
          case "Other":
            if (errors) {
              errors.forEach(error => {
                if (!IGNORE_ERROR_CODES.includes(error.errorCode))
                  addErrorToNotification({
                    title: error.message,
                    message: error.developerText
                  });
              });
            }
            break;
          default:
            addErrorToNotification({ title: errorType, message: errors });
        }
      } catch (e) {
        addErrorToNotification({
          title: jsonData.status,
          message: jsonData.debugMessage || jsonData.message || jsonData
        });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
