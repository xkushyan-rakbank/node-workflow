import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import routes from "../../routes";
import { AgentProtectedRoute } from "../../components/Routers";

import Login from "../../containers/AgentPages/Login";
import Admin from "../../containers/AgentPages/SearchProspect";
import SearchedAppInfo from "../../containers/AgentPages/SearchedAppInfo";

const AgentPages = () => (
  <Switch>
    <Route key="login" exact path={routes.login} component={Login} />,
    <AgentProtectedRoute key="search" exact path={routes.searchProspect} component={Admin} />,
    <AgentProtectedRoute key="info" path={routes.SearchedAppInfo} component={SearchedAppInfo} />,
    <Redirect key="redirect" to={routes.searchProspect} />
  </Switch>
);

export default AgentPages;
