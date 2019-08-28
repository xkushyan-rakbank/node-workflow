import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import { history } from "./store/configureStore";
import BasicsForm from "./containers/BasicsForm";
import AboutCompany from "./containers/AboutCompany";
import CompanyStakeholders from "./containers/CompanyStakeholders";
import FinalQuestions from "./containers/FinalQuestions";
import FormConfirm from "./containers/FormConfirm";
import FormLayout from "./containers/FormLayout";
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
            <Redirect from="/" to="/ApplicantInfo" />
            <Switch>
              <Route exact path="/ApplicantInfo" component={BasicsForm} />
              <Route exact path="/VerifyOTP" component={FormConfirm} />
              <Route exact path="/CompanyInfo" component={AboutCompany} />
              <Route
                exact
                path="/StakeholdersInfo"
                component={CompanyStakeholders}
              />
              <Route exact path="/FinalQuestions" component={FinalQuestions} />
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
