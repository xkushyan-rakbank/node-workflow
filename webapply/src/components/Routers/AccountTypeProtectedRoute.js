import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import routes from "../../routes";
import { getAccountType } from "../../store/selectors/appConfig";
import { queryParams } from "../../constants";

export const AccountTypeProtectedRoute = ({ component: Component, render, ...rest }) => {
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const accountType = useSelector(getAccountType) || searchParams.get(queryParams.PRODUCT);

  return (
    <Route
      {...rest}
      render={props => {
        if (!accountType) return <Redirect to={routes.accountsComparison} />;

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};
