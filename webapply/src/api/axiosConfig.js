import axios from "axios";
import store from "./../store/configureStore";
import { setInputsErrors } from "./../store/actions/serverValidation";
import { applicationStatusServerError } from "./../store/actions/applicationStatus";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_PATH || "http://localhost:8080"
});

/*
 * errors response handling with the Axios interceptor
 */
instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
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
