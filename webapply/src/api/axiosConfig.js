import axios from "axios";
import { store } from "./../store";
import { setInputsErrors } from "./../store/actions/serverValidation";
import { setError } from "./../store/actions/reCaptcha";
import { applicationStatusServerError } from "./../store/actions/applicationStatus";

const STOP = "stop";

const getBaseURL = () =>
  process.env.REACT_APP_API_PATH || "http://localhost:8080"; // http://conv.rakbankonline.ae/quickapply";

const instance = axios.create({
  baseURL: getBaseURL()
});

instance.interceptors.response.use(
  response => response,
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
