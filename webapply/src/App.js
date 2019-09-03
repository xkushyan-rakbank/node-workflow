import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { history } from "./store/configureStore";
import BasicsForm from "./containers/BasicsForm";
import AboutCompany from "./containers/AboutCompany";
import CompanyStakeholders from "./containers/CompanyStakeholders";
import FinalQuestions from "./containers/FinalQuestions";
import FormConfirm from "./containers/FormConfirm";
import FormLayout from "./containers/FormLayout";
import SelectServices from "./containers/SelectServices";
import routes from "./routes.js";
import { receiveAppConfig } from "./store/actions/appConfig";
import "./App.scss";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#16216a"
    },
    action: {
      disabledBackground: "#d3d8db"
    }
  }
});

class App extends React.Component {
  componentDidMount() {
    this.props.receiveAppConfig();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <FormLayout>
            {/* <Redirect from="/" to={routes.applicantInfo} /> */}

            <Switch>
              <Route exact path={routes.applicantInfo} component={BasicsForm} />
              <Route exact path={routes.verifyOtp} component={FormConfirm} />
              <Route exact path={routes.companyInfo} component={AboutCompany} />
              <Route
                exact
                path={routes.stakeholdersInfo}
                component={CompanyStakeholders}
              />
              <Route
                exact
                path={routes.finalQuestions}
                component={FinalQuestions}
              />
              <Route
                exact
                path={routes.selectServices}
                component={SelectServices}
              />
            </Switch>
          </FormLayout>
        </ConnectedRouter>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = {
  receiveAppConfig
};

export default connect(
  null,
  mapDispatchToProps
)(App);
