import axios from "axios";
import { store } from "../store";
import { setInputsErrors } from "../store/actions/serverValidation";
import { setError } from "../store/actions/reCaptcha";
import { NotificationsManager } from "../components/Notification";
import { encrypt, decrypt } from "./crypto";
import { log } from "../utils/loggger";

const ENCRYPT_METHODS = [];
const SYM_KEY_HEADER = "x-sym-key";

const getBaseURL = () =>
  process.env.REACT_APP_API_PATH || "http://conv.rakbankonline.ae/quickapply";

const instance = axios.create({
  baseURL: getBaseURL()
});

instance.interceptors.request.use(config => {
  const { rsaPublicKey } = store.getState().appConfig;

  if (rsaPublicKey && ENCRYPT_METHODS.includes(config.method)) {
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

    if (status === 400 && jsonData.errorType === "ReCaptchaError") {
      store.dispatch(setError(data.errors));
    } else if (status === 400 && jsonData.errors) {
      store.dispatch(setInputsErrors(data.errors));
    } else {
      log(jsonData);
      NotificationsManager.add && NotificationsManager.add();
    }

    return Promise.reject(error);
  }
);

export default instance;
