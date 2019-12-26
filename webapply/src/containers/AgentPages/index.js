import React from "react";
import { Route } from "react-router-dom";

import routes from "../../routes";
import { AgentProtectedRoute } from "../../components/Routers";

import Login from "../../containers/AgentPages/Login";
import Admin from "../../containers/AgentPages/SearchProspect";
import SearchedAppInfo from "../../containers/AgentPages/SearchedAppInfo";

const AgentPages = () => (
  <Route
    render={() => (
      <>
        <Route exact path={routes.login} component={Login} />
        <AgentProtectedRoute exact path={routes.searchProspect} component={Admin} />
        <AgentProtectedRoute path={routes.SearchedAppInfo} component={SearchedAppInfo} />
      </>
    )}
  />
);

export default AgentPages;
