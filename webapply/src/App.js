import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { history } from "./store";
import { ApplicantInfo } from "./containers/AplicantInfo/ApplicantInfo";
import { CompanyInfo } from "./containers/CompanyInfo/CompanyInfo";
import { Login } from "./agent/Login";
import CompanyStakeholders from "./containers/CompanyStakeholders/CompanyStakeholders";
import { FinalQuestions } from "./containers/FinalQuestions/index";
import FormConfirm from "./containers/FormConfirm";
import FormLayout from "./containers/FormLayout";
import SearchProspect from "./agent/SearchProspect";
import { SelectServices } from "./containers/SelectServices";
import { AccountsComparison } from "./containers/AccountsComparison";
import ApplicationOverview from "./containers/ApplicationOverview/ApplicationOverview";
import DetailedAccount from "./containers/DetailedAccount/DetailedAccount";
import ComeBackLogin from "./containers/ComeBack/ComeBackLogin";
import ComeBackVerification from "./containers/ComeBack/ComeBackVerification";
import MyApplications from "./containers/MyApplications/MyApplications";
import UploadDocuments from "./containers/FileUploader";
import ApplicationSubmitted from "./containers/ApplicationSubmitted/ApplicationSubmitted";
import SearchedAppInfo from "./agent/SearchedAppInfo";
import ReUploadDocuments from "./containers/ReUploadDocuments";
import { AgentProtectedRoute, ProspectProtectedRoute } from "./components/Routers";
import routes from "./routes.js";
import { theme } from "./theme";
import { SubmitApplication } from "./containers/SelectServices/components/SubmitApplication";
import { receiveAppConfig } from "./store/actions/appConfig";
import { prospectAutoSave } from "./store/actions/sendProspectToAPI";
import { getEndpoints } from "./store/selectors/appConfig";

import "./App.scss";

const App = ({ receiveAppConfig, prospectAutoSave }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => {
        localStorage.removeItem("videoAlreadyPlayed");
      });
    }
    receiveAppConfig();
    prospectAutoSave();
  }, [receiveAppConfig, prospectAutoSave]);

  return (
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <FormLayout>
          <Switch>
            <ProspectProtectedRoute
              exact
              path={routes.ApplicationSubmitted}
              component={ApplicationSubmitted}
            />
            <Route exact path={routes.accountsComparison} component={AccountsComparison} />
            <Route exact path={routes.applicantInfo} component={ApplicantInfo} />
            <ProspectProtectedRoute exact path={routes.verifyOtp} component={FormConfirm} />
            <ProspectProtectedRoute exact path={routes.companyInfo} component={CompanyInfo} />
            <Route exact path="/agent" render={() => <Redirect to={routes.login} />} />
            <Route exact path={routes.login} component={Login} />
            <AgentProtectedRoute exact path={routes.searchProspect} component={SearchProspect} />
            <ProspectProtectedRoute
              exact
              path={routes.stakeholdersInfo}
              component={CompanyStakeholders}
            />
            <ProspectProtectedRoute exact path={routes.finalQuestions} component={FinalQuestions} />
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
            <ProspectProtectedRoute exact path={routes.selectServices} component={SelectServices} />

            <Route exact path={routes.applicationOverview} component={ApplicationOverview} />
            <Route exact path={routes.detailedAccount} component={DetailedAccount} />
            <Route exact path={routes.comeBackLogin} component={ComeBackLogin} />
            <Route exact path={routes.comeBackLoginVerification} component={ComeBackVerification} />
            <Route exact path={routes.MyApplications} component={MyApplications} />
            <AgentProtectedRoute path={routes.SearchedAppInfo} component={SearchedAppInfo} />
            <ProspectProtectedRoute
              exact
              path={routes.SubmitApplication}
              component={SubmitApplication}
            />
            <Redirect to={routes.accountsComparison} />
          </Switch>
        </FormLayout>
      </ConnectedRouter>
    </MuiThemeProvider>
  );
};

const mapStateToProps = state => ({
  endpoints: getEndpoints(state)
});

const mapDispatchToProps = {
  receiveAppConfig,
  prospectAutoSave
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
