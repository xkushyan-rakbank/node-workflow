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
import uploadDocuments from "./uploadDocuments";
import completedSteps from "./completedSteps";
import accountNumbers from "./accountNumbers";
import agentFeatures from "./agentFeatures";
import inputFieldBehaviours from "./inputFieldBehaviours";
import kyc from "./kyc";
import sdkConfig from "./sdkConfig";
import webToMobile from "./webToMobile";
import termsAndConditions from "./termsAndConditions";
import additionalInfo from "./additionalInfo";
import applicantInfo from "./applicantInfo";

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
    uploadDocuments,
    completedSteps,
    accountNumbers,
    agentFeatures,
    inputFieldBehaviours,
    kyc,
    sdkConfig,
    webToMobile,
    termsAndConditions,
    additionalInfo,
    applicantInfo
  });

export default reducers;
