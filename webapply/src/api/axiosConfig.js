import axios from "axios";
import { store } from "./../store";
import { setInputsErrors } from "./../store/actions/serverValidation";
import { setError } from "./../store/actions/reCaptcha";
import { applicationStatusServerError } from "./../store/actions/applicationStatus";
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
        data: JSON.parse(decrypt(symKey, response.data))
      };
    }

    return response;
  },
  error => {
    const {
      status,
      data: { errors, errorType }
    } = error.response;

    if (status === 400) {
      if (errorType === "ReCaptchaError") {
        store.dispatch(setError(errors));
      } else {
        store.dispatch(setInputsErrors(errors));
      }
    } else {
      store.dispatch(applicationStatusServerError());
    }
    return Promise.reject(error);
  }
);

export default instance;
