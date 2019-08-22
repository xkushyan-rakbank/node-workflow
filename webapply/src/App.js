import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { history } from "./store/configureStore";
import BasicsForm from "./containers/BasicsForm";
import AboutCompany from "./containers/AboutCompany";
import CompanyStakeholders from "./containers/CompanyStakeholders";
import FormConfirm from "./containers/FormConfirm";
import FormLayout from "./containers/FormLayout";
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

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ConnectedRouter history={history}>
      <FormLayout>
        <Redirect from="/" to="start-with-the-basics" />
        <Switch>
          <Route exact path="/start-with-the-basics" component={BasicsForm} />
          <Route exact path="/confirm" component={FormConfirm} />
          <Route exact path="/about-your-company" component={AboutCompany} />
          <Route
            exact
            path="/add-company-stakeholders"
            component={CompanyStakeholders}
          />
        </Switch>
      </FormLayout>
    </ConnectedRouter>
  </MuiThemeProvider>
);

export default App;
