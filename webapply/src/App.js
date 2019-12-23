import React, { useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider } from "@material-ui/core/styles";

import routes from "./routes";
import { history } from "./store";

import { components } from "./bundles";
import { FormLayout } from "./containers/FormLayout";
import { AccountsComparison } from "./containers/AccountsComparison";
import { FinalQuestionsState } from "./containers/FinalQuestions/FinalQuestionsStateContext";

import { AgentProtectedRoute, ProspectProtectedRoute } from "./components/Routers";

import { getEndpoints } from "./store/selectors/appConfig";
import { receiveAppConfig } from "./store/actions/appConfig";
import { prospectAutoSave } from "./store/actions/sendProspectToAPI";

import { theme } from "./theme";
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
        <FinalQuestionsState>
          <FormLayout>
            <Suspense fallback={null}>
              <Switch>
                <ProspectProtectedRoute
                  exact
                  path={routes.ApplicationSubmitted}
                  component={components.ApplicationSubmitted}
                />
                <Route exact path={routes.accountsComparison} component={AccountsComparison} />
                <Route exact path={routes.applicantInfo} component={components.ApplicantInfo} />
                <ProspectProtectedRoute
                  exact
                  path={routes.verifyOtp}
                  component={components.FormConfirm}
                />
                <ProspectProtectedRoute
                  exact
                  path={routes.companyInfo}
                  component={components.CompanyInfo}
                />
                <Route exact path="/agent" render={() => <Redirect to={routes.login} />} />
                <Route exact path={routes.login} component={components.Login} />
                <AgentProtectedRoute
                  exact
                  path={routes.searchProspect}
                  component={components.SearchProspect}
                />
                <ProspectProtectedRoute
                  exact
                  path={routes.stakeholdersInfo}
                  component={components.CompanyStakeholders}
                />
                <ProspectProtectedRoute
                  exact
                  path={routes.finalQuestions}
                  component={components.FinalQuestions}
                />
                <ProspectProtectedRoute
                  exact
                  path={routes.uploadDocuments}
                  component={components.UploadDocuments}
                />
                <ProspectProtectedRoute
                  exact
                  path={routes.reUploadDocuments}
                  component={components.ReUploadDocuments}
                />
                <ProspectProtectedRoute
                  exact
                  path={routes.selectServices}
                  component={components.SelectServices}
                />

                <Route
                  exact
                  path={routes.applicationOverview}
                  component={components.ApplicationOverview}
                />
                <Route exact path={routes.detailedAccount} component={components.DetailedAccount} />
                <Route exact path={routes.comeBackLogin} component={components.ComeBackLogin} />
                <Route
                  exact
                  path={routes.comeBackLoginVerification}
                  component={components.ComeBackVerification}
                />
                <Route exact path={routes.MyApplications} component={components.MyApplications} />
                <AgentProtectedRoute
                  path={routes.SearchedAppInfo}
                  component={components.SearchedAppInfo}
                />
                <ProspectProtectedRoute
                  exact
                  path={routes.SubmitApplication}
                  component={components.SubmitApplication}
                />
                <Redirect to={routes.accountsComparison} />
              </Switch>
            </Suspense>
          </FormLayout>
        </FinalQuestionsState>
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
