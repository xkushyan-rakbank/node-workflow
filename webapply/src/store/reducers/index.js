import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appConfig from "./appConfig";
import reCaptcha from "./reCaptcha";
import serverValidation from "./serverValidation";
import sendProspectToAPI from "./sendProspectToAPI";
import otp from "./otp";
import login from "./loginForm";
import searchProspect from "./searchProspect";
import retrieveApplicantInfo from "./retrieveApplicantInfo";
import stakeholders from "./stakeholders";
import screenProspect from "./screenProspect";
import validationErrors from "./validationErrors";
import uploadDocuments from "./getProspectDocuments";
import completedSteps from "./completedSteps";
import accountNumbers from "./accountNumbers";
import playedVideos from "./playedVideos";

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    appConfig,
    otp,
    serverValidation,
    reCaptcha,
    sendProspectToAPI,
    login,
    searchProspect,
    retrieveApplicantInfo,
    stakeholders,
    screenProspect,
    validationErrors,
    uploadDocuments,
    completedSteps,
    playedVideos,
    accountNumbers
  });

export default reducers;
