import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appConfig from "./appConfig";

/**
 * @typedef {Object} Store
 * @property {AppConfig} appConfig
 * @property {Object} router
 */
const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    appConfig
  });

export default reducers;
