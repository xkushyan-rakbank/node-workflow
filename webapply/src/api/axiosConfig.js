import axios from "axios";
import store from "./../store/configureStore";
import { setInputsErrors } from "./../store/actions/serverValidation";
import { setError } from "./../store/actions/reCaptcha";
import {
  applicationStatusServerError,
  applicationStatusProceed,
  applicationStatusStop
} from "./../store/actions/applicationStatus";
import getBaseURL from "./../utils/getBaseURL";

const instance = axios.create({
  baseURL: getBaseURL()
});

/*
 * errors response handling with the Axios interceptor
 */
instance.interceptors.response.use(
  function(response) {
    const {
      data: { preScreening }
    } = response;

    if (preScreening && preScreening.statusOverAll === "stop") {
      store.dispatch(applicationStatusStop(preScreening.screeningResults));
    } else {
      store.dispatch(applicationStatusProceed());
    }

    return response;
  },
  function(error) {
    console.error({ error });
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
    } else if (status === 500) {
      store.dispatch(applicationStatusServerError());
    } else {
      console.error({ error });
    }
    return Promise.reject(error);
  }
);

export default instance;
