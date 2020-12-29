import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import routes from "../../routes";
import { AgentProtectedRoute } from "../../containers/Routers";

import Login from "../../containers/AgentPages/Login";
import Admin from "../../containers/AgentPages/SearchProspect";
import SearchedAppInfo from "../../containers/AgentPages/SearchedAppInfo";
import InviteCustomer from "../../containers/AgentPages/InviteCustomer";

const AgentPages = () => (
  <Switch>
    <Route exact path={routes.login} component={Login} />
    <AgentProtectedRoute exact path={routes.inviteCustomer} component={InviteCustomer} />
    <AgentProtectedRoute exact path={routes.searchProspect} component={Admin} />
    <AgentProtectedRoute path={routes.SearchedAppInfo} component={SearchedAppInfo} />
    <Redirect to={routes.searchProspect} />
  </Switch>
);

export default AgentPages;
