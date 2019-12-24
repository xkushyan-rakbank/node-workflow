import React, { lazy } from "react";
import { Route } from "react-router-dom";

import routes from "../../routes";
import { AgentProtectedRoute } from "../../components/Routers";

const Login = lazy(() => import("../../containers/AgentPages/Login"));
const Admin = lazy(() => import("../../containers/AgentPages/SearchProspect"));
const SearchedAppInfo = lazy(() => import("../../containers/AgentPages/SearchedAppInfo"));

export const AgentPages = () => (
  <Route
    path="/agent"
    render={() => (
      <>
        <Route exact path={routes.login} component={Login} />
        <AgentProtectedRoute exact path={routes.searchProspect} component={Admin} />
        <AgentProtectedRoute path={routes.SearchedAppInfo} component={SearchedAppInfo} />
      </>
    )}
  />
);
