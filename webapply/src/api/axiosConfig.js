import axios from "axios";
import { store } from "./../store";
import { setInputsErrors } from "./../store/actions/serverValidation";
import { setError } from "./../store/actions/reCaptcha";
import {
  applicationStatusServerError,
  applicationStatusProceed,
  applicationStatusStop
} from "./../store/actions/applicationStatus";

const STOP = "stop";

const getBaseURL = () =>
  process.env.REACT_APP_API_PATH || "http://conv.rakbankonline.ae/quickapply";

const instance = axios.create({
  baseURL: getBaseURL()
});

instance.interceptors.response.use(
  response => {
    const {
      data: { preScreening }
    } = response;

    if (preScreening && preScreening.statusOverAll === STOP) {
      store.dispatch(applicationStatusStop(preScreening.screeningResults));
    } else {
      store.dispatch(applicationStatusProceed());
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
