import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import routes from "../../routes";
import { getAccountType } from "../../store/selectors/appConfig";

export const AccountTypeProtectedRoute = ({ component: Component, render, ...rest }) => {
  const accountType = useSelector(getAccountType);

  return (
    <Route
      {...rest}
      render={props =>
        accountType || process.env.NODE_ENV === "development" ? (
          Component ? (
            <Component {...props} />
          ) : (
            render(props)
          )
        ) : (
          <Redirect to={routes.accountsComparison} />
        )
      }
    />
  );
};
