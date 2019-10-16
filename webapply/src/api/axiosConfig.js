import axios from "axios";
import store from "./../store/configureStore";
import { setInputsErrors } from "./../store/actions/serverValidation";
import { applicationStatusServerError } from "./../store/actions/applicationStatus";

const LOCALHOST = "localhost";
const RAKBANKONLINE = "conv.rakbankonline.ae";

const instance = axios.create({
  baseURL: getBaseURL()
});

function getBaseURL() {
  let { host, protocol } = window.location;

  if (host.includes(LOCALHOST)) {
    return "http://localhost:8080";
  } else if (host.includes(RAKBANKONLINE)) {
    return `${protocol}//${host}/quickapply`;
  } else {
    return `${protocol}//${host}`;
  }
}

/*
 * errors response handling with the Axios interceptor
 */
instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.log({ error });
    const {
      status,
      data: { errors }
    } = error.response;

    if (status === 400 || error.response) {
      store.dispatch(setInputsErrors(errors));
    } else if (status === 500 || error.request) {
      store.dispatch(applicationStatusServerError());
    } else {
      console.log({ error });
    }
    return Promise.reject(error);
  }
);

export default instance;
