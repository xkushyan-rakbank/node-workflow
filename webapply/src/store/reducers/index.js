import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appConfig from "./appConfig";
import reCaptcha from "./reCaptcha";
import applicantInfoForm from "./applicantInfoForm";
import serverValidation from "./serverValidation";

/**
 * @typedef {Object} Store
 * @property {AppConfig} appConfig
 * @property {ReCaptcha} reCaptcha
 * @property {ServerValidation} serverValidation
 * @property {Object} router
 */
const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    appConfig,
    serverValidation,
    reCaptcha,
    applicantInfoForm
  });

export default reducers;
