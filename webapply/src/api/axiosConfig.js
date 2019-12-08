import axios from "axios";
import { store } from "../store";
import { setInputsErrors } from "../store/actions/serverValidation";
import { setError } from "../store/actions/reCaptcha";
import { NotificationsManager } from "../components/Notifications";
import { encrypt, decrypt } from "./crypto";
import { log } from "../utils/loggger";

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

    if (config.symKey && data) {
      jsonData = JSON.parse(decrypt(config.symKey, data).data);
    }

    if (status === 400) {
      if (jsonData.errorType === "ReCaptchaError") {
        return store.dispatch(setError(data.errors));
      } else if (jsonData.errors) {
        return store.dispatch(setInputsErrors(data.errors));
      }
    }

    NotificationsManager.add && NotificationsManager.add();
    return Promise.reject(error);
  }
);

export default instance;
