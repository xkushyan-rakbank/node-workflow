import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import routes from "../../routes";
import { checkLoginStatus } from "../../store/selectors/loginSelector";
import { ErrorBoundary } from "./ErrorBoundary";
import { getAuthToken } from "../../store/selectors/appConfig";

export const AgentProtectedRoute = ({ component: Component, render, ...rest }) => {
  const isAuthenticated = useSelector(checkLoginStatus);
  const authToken = useSelector(getAuthToken);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && authToken ? (
          <ErrorBoundary>{Component ? <Component {...props} /> : render(props)}</ErrorBoundary>
        ) : (
          <Redirect to={routes.login} />
        )
      }
    />
  );
};
