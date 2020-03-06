import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import routes from "../../routes";
import { getProspectId } from "../../store/selectors/appConfig";
import { checkLoginStatus } from "../../store/selectors/loginSelector";
import { ErrorBoundary } from "./ErrorBoundary";

export const ProspectProtectedRoute = ({ component: Component, render, ...rest }) => {
  const isAgent = useSelector(checkLoginStatus);
  const prospectId = useSelector(getProspectId);

  return (
    <Route
      {...rest}
      render={props =>
        prospectId || process.env.NODE_ENV === "development" ? (
          <ErrorBoundary>{Component ? <Component {...props} /> : render(props)}</ErrorBoundary>
        ) : isAgent ? (
          <Redirect to={routes.login} />
        ) : (
          <Redirect to={routes.comeBackLogin} />
        )
      }
    />
  );
};
