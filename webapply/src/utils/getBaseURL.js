import { store } from "./../store";
import isEmpty from "lodash/isEmpty";

const LOCALHOST = "localhost";
const RAKBANKONLINE = "conv.rakbankonline.ae";

const getBaseURL = () => {
  let { host, protocol } = window.location;
  if (!!store && !isEmpty(store.getState().appConfig.endpoints)) {
    return store.getState().appConfig.endpoints["baseUrl"];
  } else if (host.includes(LOCALHOST)) {
    return "http://localhost:8080";
  } else if (host.includes(RAKBANKONLINE)) {
    return `${protocol}//${host}/quickapply`;
  } else {
    return `${protocol}//${host}`;
  }
};

export default getBaseURL;
