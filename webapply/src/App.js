import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { history } from "./store/configureStore";
import ApplicantInfo from "./containers/ApplicantInfo";
import Login from "./agent/Login";
import AboutCompany from "./containers/AboutCompany";
import CompanyStakeholders from "./containers/CompanyStakeholders";
import FinalQuestions from "./containers/FinalQuestions";
import FormConfirm from "./containers/FormConfirm";
import FormLayout from "./containers/FormLayout";
import SearchProspect from "./agent/SearchProspect";
import SelectServices from "./containers/SelectServices";
import AccountsComparison from "./containers/AccountsComparison/AccountsComparison";
import ApplicationOverview from "./containers/ApplicationOverview/ApplicationOverview";
import DetailedAccount from "./containers/DetailedAccount/DetailedAccount";
import ComeBackLogin from "./containers/ComeBack/ComeBackLogin";
import ComeBackVerification from "./containers/ComeBack/ComeBackVerification";
import MyApplications from "./containers/MyApplications/MyApplications";
import UploadDocuments from "./containers/FileUploader";
import ApplicationSubmitted from "./containers/ApplicationSubmitted/ApplicationSubmitted";
import SearchedAppInfo from "./agent/SearchedAppInfo";
import ReUploadDocuments from "./containers/ReUploadDocuments";
import SubmitApplication from "./containers/SubmitApplication";
import { receiveAppConfig } from "./store/actions/appConfig";
import { prospectAutoSave } from "./store/actions/sendProspectToAPI";
import { getEndpoints } from "./store/selectors/appConfig";
import routes from "./routes.js";
import "./App.scss";

import TagManager from "react-gtm-module";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#000000"
    },
    secondary: {
      main: "#517085"
    },
    action: {
      disabledBackground: "#d3d8db"
    }
  }
});

const tagManagerArgs = {
  gtmId: "GTM-PPZWHLS",
  dataLayerName: "PageDataLayer"
};

class App extends React.Component {
  state = {
    renderChildren: false,
    hasError: false
  };

  componentDidMount() {
    this.props.receiveAppConfig();
    this.handlePageReload();
    TagManager.initialize(tagManagerArgs);
    this.props.prospectAutoSave();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.endpoints !== this.props.endpoints) {
      this.setState({ renderChildren: true });
    }
  }

  handlePageReload = () => {
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("videoAlreadyPlayed");
    });
  };
  render() {
    TagManager.initialize(tagManagerArgs);
    // const { renderChildren } = this.state; // return in future
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <FormLayout>
              <Switch>
                <Route exact path={routes.ApplicationSubmitted} component={ApplicationSubmitted} />
                <Route exact path={routes.accountsComparison} component={AccountsComparison} />
                <Route exact path={routes.applicantInfo} component={ApplicantInfo} />
                <Route exact path={routes.verifyOtp} component={FormConfirm} />
                <Route exact path={routes.companyInfo} component={AboutCompany} />
                <Route exact path="/agent" render={() => <Redirect to={routes.login} />} />
                <Route exact path={routes.login} component={Login} />
                <Route exact path={routes.searchProspect} component={SearchProspect} />
                <Route exact path={routes.stakeholdersInfo} component={CompanyStakeholders} />
                <Route exact path={routes.finalQuestions} component={FinalQuestions} />
                <Route exact path={routes.uploadDocuments} component={UploadDocuments} />
                <Route exact path={routes.reUploadDocuments} component={ReUploadDocuments} />
                <Route exact path={routes.selectServices} component={SelectServices} />

                <Route exact path={routes.applicationOverview} component={ApplicationOverview} />
                <Route exact path={routes.detailedAccount} component={DetailedAccount} />
                <Route exact path={routes.comeBackLogin} component={ComeBackLogin} />
                <Route
                  exact
                  path={routes.comeBackLoginVerification}
                  component={ComeBackVerification}
                />
                <Route exact path={routes.MyApplications} component={MyApplications} />
                <Route path={routes.SearchedAppInfo} component={SearchedAppInfo} />
                <Route exact path={routes.SubmitApplication} component={SubmitApplication} />
                <Redirect to={routes.accountsComparison} />
              </Switch>
            </FormLayout>
          </ConnectedRouter>
        </MuiThemeProvider>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    endpoints: getEndpoints(state)
  };
};

const mapDispatchToProps = {
  receiveAppConfig,
  prospectAutoSave
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
