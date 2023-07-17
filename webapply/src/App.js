import React, { useEffect, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
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

import { FormEmailConfirmPage, FormConfirmMobilePage } from "./containers/FormConfirm";
const ApplicationSubmitted = lazy(() => import("./containers/ApplicationSubmitted"));
const QuickapplyLanding = lazy(() => import("./containers/AccountsComparison"));

const UploadDocuments = lazy(() => import("./containers/UploadDocuments"));
const ReUploadDocuments = lazy(() => import("./containers/ReUploadDocuments"));
const ApplicantInfo = lazy(() => import("./containers/ApplicantInfo"));
const DetailedAccount = lazy(() => import("./containers/DetailedAccount"));
const CompanyInfo = lazy(() => import("./containers/CompanyInfo"));
const CompanyStakeholders = lazy(() => import("./containers/CompanyStakeholders"));
const StakeholderPreview = lazy(() =>
  import("./containers/CompanyStakeholders/StakeholderPreview")
);
const StakeholderTermsAndConditions = lazy(() =>
  import("./containers/CompanyStakeholders/components/StakeholderTermsAndConditions")
);
const FinalQuestions = lazy(() => import("./containers/FinalQuestions"));
const AdditionalInfoComponent = lazy(() => import("./containers/Additional"));
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
const PersonaSelection = lazy(() => import("./containers/PersonaSelection"));

const WebToMobilePage = lazy(() => import("./containers/WebToMobilePage"));

const AdditionalCompanyInformation = lazy(() =>
  import("./containers/Additional/components/CompanyInformation")
);

const AdditionalStakeholderInformation = lazy(() =>
  import("./containers/Additional/components/StakeholderInformation")
);
const AccountServices = lazy(() => import("./containers/AccountServices"));

const App = ({ receiveAppConfig, prospectAutoSave }) => {
  useEffect(() => {
    receiveAppConfig();
    prospectAutoSave();
  }, [receiveAppConfig, prospectAutoSave]);

  useEffect(() => {
    if (history.location.pathname === routes.applicantInfo) {
      history.push(routes.quickapplyLanding);
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
              <ProtectedRoute exact path={routes.applicantInfo} component={ApplicantInfo} />
              <ProspectProtectedRoute
                exact
                path={routes.verifyEmailOtp}
                component={FormEmailConfirmPage}
              />
              <ProspectProtectedRoute
                exact
                path={routes.verifyMobileOtp}
                component={FormConfirmMobilePage}
              />
              <ProspectProtectedRoute exact path={routes.companyInfo} component={CompanyInfo} />
              <ProspectProtectedRoute
                exact
                path={routes.stakeholdersInfo}
                component={CompanyStakeholders}
              />
              <ProspectProtectedRoute
                exact
                path={routes.stakeholdersPreview}
                component={StakeholderPreview}
              />
              <ProspectProtectedRoute
                exact
                path={routes.StakeholderTermsAndConditions}
                component={StakeholderTermsAndConditions}
              />
              <ProspectProtectedRoute
                exact
                path={routes.additionalInfoComponent}
                component={AdditionalInfoComponent}
              />
              <ProspectProtectedRoute
                exact
                path={routes.additionalCompanyInformation}
                component={AdditionalCompanyInformation}
              />
              <ProspectProtectedRoute
                exact
                path={routes.additionalStakeholderInformation}
                component={AdditionalStakeholderInformation}
              />
              <ProspectProtectedRoute
                exact
                path={routes.accountServices}
                component={AccountServices}
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
              <AccountTypeProtectedRoute
                exact
                path={routes.personaSelection}
                component={PersonaSelection}
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
              <ProtectedRoute exact path="/" component={QuickapplyLanding} />
              {/* <Redirect exact path={smeBaseName} to={routes.quickapplyLanding} />
              <Redirect exact path="/" to={routes.quickapplyLanding} /> */}
              <Route path={routes.webToMobile} component={WebToMobilePage} />
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
