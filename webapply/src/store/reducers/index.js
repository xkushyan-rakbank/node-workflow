import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appConfig from "./appConfig";
import reCaptcha from "./reCaptcha";
import applicantInfoForm from "./applicantInfoForm";
import serverValidation from "./serverValidation";
import aboutCompany from "./aboutCompany";
import applicationStatus from "./applicationStatus";
import otp from "./otp";
import login from "./loginForm";
import authReducer from "./authReducers";
import docUploadReducer from "./getProspectDocuments";
import searchProspect from "./searchProspect";

/**
 * @typedef {Object} Store
 * @property {AppConfig} appConfig
 * @property {ReCaptcha} reCaptcha
 * @property {Otp} otp
 * @property {ServerValidation} serverValidation
 * @property {Object} router
 */
const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    appConfig,
    otp,
    serverValidation,
    reCaptcha,
    applicantInfoForm,
    aboutCompany,
    applicationStatus,
    login,
    users: authReducer,
    uploadedDocs: docUploadReducer,
    searchProspect
  });

export default reducers;
