import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appConfig from "./appConfig";

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    appConfig
  });

export default reducers;
