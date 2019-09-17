import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appConfig from "./appConfig";
import reCaptcha from "./reCaptcha";

/**
 * @typedef {Object} Store
 * @property {AppConfig} appConfig
 * @property {ReCaptcha} reCaptcha
 * @property {Object} router
 */
const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    appConfig,
    reCaptcha
  });

export default reducers;
