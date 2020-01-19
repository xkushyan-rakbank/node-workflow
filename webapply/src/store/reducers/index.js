import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appConfig from "./appConfig";
import reCaptcha from "./reCaptcha";
import serverValidation from "./serverValidation";
import sendProspectToAPI from "./sendProspectToAPI";
import otp from "./otp";
import login from "./loginForm";
import searchProspect from "./searchProspect";
import retrieveApplicantInfo from "./retrieveApplicantInfo";
import selectedAccountInfo from "./selectedAccountInfo";
import stakeholders from "./stakeholders";
import screenProspect from "./screenProspect";
import validationErrors from "./validationErrors";
import uploadDocuments from "./getProspectDocuments";
import completedSteps from "./completedSteps";

const selectedAccountInfoPersistConfig = {
  key: "selectedAccountInfo",
  storage
};

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
    selectedAccountInfo: persistReducer(selectedAccountInfoPersistConfig, selectedAccountInfo),
    stakeholders,
    screenProspect,
    validationErrors,
    uploadDocuments,
    completedSteps
  });

export default reducers;
