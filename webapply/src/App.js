import React, { useEffect, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { matchPath } from "react-router";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider } from "@material-ui/core/styles";

import routes, { agentBaseName } from "./routes";
import { history } from "./store";

import { FormLayout } from "./containers/FormLayout";
import { ServerRequestLoadingScreen } from "./components/ServerRequestLoadingScreen/ServerRequestLoadingScreen";
import { OTPProtectedRoute } from "./components/Routers/OTPProtectedRoute";
import { ProspectProtectedRoute } from "./components/Routers";
import { AccountTypeProtectedRoute } from "./components/Routers/AccountTypeProtectedRoute";
import { ProtectedRoute } from "./components/Routers/ProtectedRoute";

import { receiveAppConfig } from "./store/actions/appConfig";
import { prospectAutoSave } from "./store/actions/sendProspectToAPI";

import { theme } from "./theme";
import "./App.scss";

const ApplicationSubmitted = lazy(() => import("./containers/ApplicationSubmitted"));
const AccountsComparison = lazy(() => import("./containers/AccountsComparison"));
const FormConfirm = lazy(() => import("./containers/FormConfirm"));
const UploadDocuments = lazy(() => import("./containers/UploadDocuments"));
const ReUploadDocuments = lazy(() => import("./containers/ReUploadDocuments"));
const ApplicantInfo = lazy(() => import("./containers/AplicantInfo"));
const DetailedAccount = lazy(() => import("./containers/DetailedAccount"));
const CompanyInfo = lazy(() => import("./containers/CompanyInfo"));
const CompanyStakeholders = lazy(() => import("./containers/CompanyStakeholders"));
const FinalQuestions = lazy(() => import("./containers/FinalQuestions"));
const SelectServices = lazy(() => import("./containers/SelectServices"));
const ApplicationOverview = lazy(() => import("./containers/ApplicationOverview"));
const ComeBackLogin = lazy(() => import("./containers/ComeBackLogin"));
const ComeBackVerification = lazy(() => import("./containers/ComeBackVerification"));
const MyApplications = lazy(() => import("./containers/MyApplications"));
const NotFoundPage = lazy(() => import("./containers/NotFoundPage/index"));
const SubmitApplication = lazy(() =>
  import("./containers/SelectServices/components/SubmitApplication")
);
const Agents = lazy(() => import("./containers/AgentPages"));

const App = ({ receiveAppConfig, prospectAutoSave }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => {
        localStorage.removeItem("videoAlreadyPlayed");
      });
    }

    let accountType;
    const matchProfile = matchPath(history.location.pathname, {
      path: routes.detailedAccount
    });

    accountType = matchProfile && matchProfile.params && matchProfile.params.accountType;

    receiveAppConfig(accountType);
    prospectAutoSave();
  }, [receiveAppConfig, prospectAutoSave, history.location.pathname]);

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
              <AccountTypeProtectedRoute
                exact
                path={routes.applicantInfo}
                component={ApplicantInfo}
              />
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
              <ProtectedRoute
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
              <Redirect exact path="/" to={routes.accountsComparison} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
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
