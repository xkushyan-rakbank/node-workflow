import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import routes from "../../routes";
import { checkLoginStatus } from "../../store/selectors/loginSelector";
import { ErrorBoundary } from "./ErrorBoundary";

export const AgentProtectedRoute = ({ component: Component, render, ...rest }) => {
  const isAuthenticated = useSelector(checkLoginStatus);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated || process.env.NODE_ENV === "development" ? (
          <ErrorBoundary>{Component ? <Component {...props} /> : render(props)}</ErrorBoundary>
        ) : (
          <Redirect to={routes.login} />
        )
      }
    />
  );
};
