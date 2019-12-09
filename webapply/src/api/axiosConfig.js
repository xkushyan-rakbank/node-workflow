import axios from "axios";
import { store } from "../store";
import { setInputsErrors } from "../store/actions/serverValidation";
import { setError } from "../store/actions/reCaptcha";
import { NotificationsManager } from "../components/Notifications";
import { encrypt, decrypt } from "./crypto";

const ENCRYPT_METHODS = ["post", "put"];
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

    if (symKey && response.data) {
      return {
        ...response,
        data: JSON.parse(decrypt(symKey, response.data).data)
      };
    }

    return response;
  },
  error => {
    const { status, data, config } = error.response;
    let jsonData = data;

    if (config.symKey && typeof data === "string") {
      try {
        jsonData = JSON.parse(decrypt(config.symKey, data).data);
      } catch (e) {
        log(e);
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
