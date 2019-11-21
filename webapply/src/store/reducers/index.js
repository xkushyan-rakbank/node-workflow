import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appConfig from "./appConfig";
import reCaptcha from "./reCaptcha";
// import applicantInfoForm from "./applicantInfoForm";
import serverValidation from "./serverValidation";
import sendProspectToAPI from "./sendProspectToAPI";
import applicationStatus from "./applicationStatus";
import otp from "./otp";
import login from "./loginForm";
import searchProspect from "./searchProspect";
import retrieveApplicantInfo from "./retrieveApplicantInfo";
import selectedAccountInfo from "./selectedAccountInfo";
import stakeholders from "./stakeholders";
import validationErrors from "./validationErrors";
import comeBackLogin from "./comeBackLogin";

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    appConfig,
    otp,
    serverValidation,
    reCaptcha,
    sendProspectToAPI,
    applicationStatus,
    login,
    searchProspect,
    retrieveApplicantInfo,
    selectedAccountInfo,
    stakeholders,
    validationErrors,
    comeBackLogin
  });

export default reducers;
