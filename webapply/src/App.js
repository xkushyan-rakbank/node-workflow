import React, { useEffect, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider } from "@material-ui/core/styles";

import routes, { agentBaseName, smeBaseName } from "./routes";
import { history } from "./store";

import { FormLayout } from "./containers/FormLayout";
import { ServerRequestLoadingScreen } from "./components/ServerRequestLoadingScreen/ServerRequestLoadingScreen";

import {
  ProspectProtectedRoute,
  OTPProtectedRoute,
  AccountTypeProtectedRoute,
  ProtectedRoute,
  OTPGeneratedProtectedRoute
} from "./containers/Routers";

import { receiveAppConfig } from "./store/actions/appConfig";
import { prospectAutoSave } from "./store/actions/sendProspectToAPI";

import { theme } from "./theme";
import "./App.scss";
import SessionExpiration from "./containers/Session";

const ApplicationSubmitted = lazy(() => import("./containers/ApplicationSubmitted"));
const QuickapplyLanding = lazy(() => import("./containers/QuickapplyLanding"));
const AccountsComparison = lazy(() => import("./containers/AccountsComparison"));
const FormConfirm = lazy(() => import("./containers/FormConfirm"));
const UploadDocuments = lazy(() => import("./containers/UploadDocuments"));
const ReUploadDocuments = lazy(() => import("./containers/ReUploadDocuments"));
const ApplicantInfo = lazy(() => import("./containers/ApplicantInfo"));
const DetailedAccount = lazy(() => import("./containers/DetailedAccount"));
const CompanyInfo = lazy(() => import("./containers/CompanyInfo"));
const CompanyStakeholders = lazy(() => import("./containers/CompanyStakeholders"));
const FinalQuestions = lazy(() => import("./containers/FinalQuestions"));
const SelectServices = lazy(() => import("./containers/SelectServices"));
const ApplicationOverview = lazy(() => import("./containers/ApplicationOverview"));
const ComeBackLogin = lazy(() => import("./containers/ComeBackLogin"));
const ComeBackVerification = lazy(() => import("./containers/ComeBackVerification"));
const MyApplications = lazy(() => import("./containers/MyApplications"));
const NotFoundPage = lazy(() => import("./containers/NotFoundPage"));
const SubmitApplication = lazy(() =>
  import("./containers/SelectServices/components/SubmitApplication")
);
const Agents = lazy(() => import("./containers/AgentPages"));
const ApplicationRedirect = lazy(() => import("./containers/ApplicationRedirect"));

const App = ({ receiveAppConfig, prospectAutoSave }) => {
  useEffect(() => {
    receiveAppConfig();
    prospectAutoSave();
  }, [receiveAppConfig, prospectAutoSave]);

  useEffect(() => {
    if (history.location.pathname === routes.applicantInfo) {
      history.push(routes.accountsComparison);
    }
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <FormLayout>
          <Suspense fallback={ServerRequestLoadingScreen()}>
            <Switch>
              <ProspectProtectedRoute
                exact
                path={routes.ApplicationSubmitted}
                component={ApplicationSubmitted}
              />
              <ProtectedRoute
                exact
                path={routes.accountsComparison}
                component={AccountsComparison}
              />
              <ProtectedRoute exact path={routes.applicantInfo} component={ApplicantInfo} />
              <ProspectProtectedRoute exact path={routes.verifyOtp} component={FormConfirm} />
              <ProspectProtectedRoute exact path={routes.companyInfo} component={CompanyInfo} />
              <ProspectProtectedRoute
                exact
                path={routes.stakeholdersInfo}
                component={CompanyStakeholders}
              />
              <ProspectProtectedRoute
                exact
                path={routes.finalQuestions}
                component={FinalQuestions}
              />
              <ProspectProtectedRoute
                exact
                path={routes.uploadDocuments}
                component={UploadDocuments}
              />
              <ProspectProtectedRoute
                exact
                path={routes.reUploadDocuments}
                component={ReUploadDocuments}
              />
              <ProspectProtectedRoute
                exact
                path={routes.selectServices}
                component={SelectServices}
              />
              <AccountTypeProtectedRoute
                exact
                path={routes.applicationOverview}
                component={ApplicationOverview}
              />
              <AccountTypeProtectedRoute
                exact
                path={routes.detailedAccount}
                component={DetailedAccount}
              />
              <ProtectedRoute exact path={routes.comeBackLogin} component={ComeBackLogin} />
              <OTPGeneratedProtectedRoute
                exact
                path={routes.comeBackLoginVerification}
                component={ComeBackVerification}
              />
              <OTPProtectedRoute exact path={routes.MyApplications} component={MyApplications} />
              <ProspectProtectedRoute
                exact
                path={routes.SubmitApplication}
                component={SubmitApplication}
              />
              <ProtectedRoute path={agentBaseName} component={Agents} />
              <ProtectedRoute exact path={routes.quickapplyLanding} component={QuickapplyLanding} />
              <ProtectedRoute exact path={smeBaseName} component={QuickapplyLanding} />
              <ProtectedRoute exact path="/"  component={QuickapplyLanding} />
              {/* <Redirect exact path={smeBaseName} to={routes.quickapplyLanding} />
              <Redirect exact path="/" to={routes.quickapplyLanding} /> */}
              <Route path={routes.applicationRedirect} component={ApplicationRedirect} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
            <SessionExpiration />
          </Suspense>
        </FormLayout>
      </ConnectedRouter>
    </MuiThemeProvider>
  );
};

const mapDispatchToProps = {
  receiveAppConfig,
  prospectAutoSave
};

export default connect(
  null,
  mapDispatchToProps
)(App);
