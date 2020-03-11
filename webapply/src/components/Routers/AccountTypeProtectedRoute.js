import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import routes from "../../routes";
import { getAccountType } from "../../store/selectors/appConfig";
import { ErrorBoundary } from "./ErrorBoundary";
import { accountTypeURIs } from "../../constants";

export const AccountTypeProtectedRoute = ({ component: Component, render, ...rest }) => {
  const accountType = useSelector(getAccountType);
  return (
    <Route
      {...rest}
      render={props => {
        if (
          !accountType &&
          !Object.keys(accountTypeURIs).includes(rest.computedMatch.params.accountType)
        )
          return <Redirect to={routes.accountsComparison} />;

        return (
          <ErrorBoundary>{Component ? <Component {...props} /> : render(props)}</ErrorBoundary>
        );
      }}
    />
  );
};
