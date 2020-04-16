import React from "react";
import { Redirect, Route } from "react-router-dom";

import routes from "../../routes";
import { ErrorBoundary } from "./ErrorBoundary";
import { accountTypeURIs } from "../../constants";

export const AccountTypeProtectedRoute = ({ component: Component, render, ...rest }) => {
  if (!Object.keys(accountTypeURIs).includes(rest.computedMatch.params.accountType)) {
    return <Redirect to={routes.accountsComparison} />;
  }

  return (
    <Route
      {...rest}
      render={props => (
        <ErrorBoundary>{Component ? <Component {...props} /> : render(props)}</ErrorBoundary>
      )}
    />
  );
};
