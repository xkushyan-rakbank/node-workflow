import React, { useEffect, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider } from "@material-ui/core/styles";

import routes from "./routes";
import { history } from "./store";

import { FormLayout } from "./containers/FormLayout";
import { AccountsComparison } from "./containers/AccountsComparison";
import { FinalQuestionsState } from "./containers/FinalQuestions/FinalQuestionsStateContext";
import { AgentPages } from "./containers/AgentPages";

import { ProspectProtectedRoute } from "./components/Routers";

import { getEndpoints } from "./store/selectors/appConfig";
import { receiveAppConfig } from "./store/actions/appConfig";
import { prospectAutoSave } from "./store/actions/sendProspectToAPI";

import { theme } from "./theme";
import "./App.scss";

const UploadDocuments = lazy(() => import("./containers/UploadDocuments"));
const ReUploadDocuments = lazy(() => import("./containers/ReUploadDocuments"));
const ApplicantInfo = lazy(() => import("./containers/AplicantInfo"));
const DetailedAccount = lazy(() => import("./containers/DetailedAccount"));

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
                  component={lazy(() => import("./containers/ApplicationSubmitted"))}
                />
                <Route exact path={routes.accountsComparison} component={AccountsComparison} />
                <Route exact path={routes.applicantInfo} component={ApplicantInfo} />
                <ProspectProtectedRoute
                  exact
                  path={routes.verifyOtp}
                  component={lazy(() => import("./containers/FormConfirm"))}
                />
                <ProspectProtectedRoute
                  exact
                  path={routes.companyInfo}
                  component={lazy(() => import("./containers/CompanyInfo"))}
                />
                <ProspectProtectedRoute
                  exact
                  path={routes.stakeholdersInfo}
                  component={lazy(() => import("./containers/CompanyStakeholders"))}
                />
                <ProspectProtectedRoute
                  exact
                  path={routes.finalQuestions}
                  component={lazy(() => import("./containers/FinalQuestions"))}
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
                  component={lazy(() => import("./containers/SelectServices"))}
                />
                <Route
                  exact
                  path={routes.applicationOverview}
                  component={lazy(() => import("./containers/ApplicationOverview"))}
                />
                <Route exact path={routes.detailedAccount} component={DetailedAccount} />
                <Route
                  exact
                  path={routes.comeBackLogin}
                  component={lazy(() => import("./containers/ComeBackLogin"))}
                />
                <Route
                  exact
                  path={routes.comeBackLoginVerification}
                  component={lazy(() => import("./containers/ComeBackVerification"))}
                />
                <Route
                  exact
                  path={routes.MyApplications}
                  component={lazy(() => import("./containers/MyApplications"))}
                />
                <ProspectProtectedRoute
                  exact
                  path={routes.SubmitApplication}
                  component={lazy(() =>
                    import("./containers/SelectServices/components/SubmitApplication/index")
                  )}
                />

                {AgentPages()}

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
