import axios from "axios";
import { store } from "./../store";
import { setInputsErrors } from "./../store/actions/serverValidation";
import { setError } from "./../store/actions/reCaptcha";
import { NotificationsManager } from "../components/Notifications";

const getBaseURL = () =>
  process.env.REACT_APP_API_PATH || "http://conv.rakbankonline.ae/quickapply";

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
      NotificationsManager.add();
    }
    return Promise.reject(error);
  }
);

export default instance;
