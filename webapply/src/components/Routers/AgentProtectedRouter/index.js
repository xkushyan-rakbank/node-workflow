import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import routes from "../../../../src/routes";
import { checkLoginStatus } from "./../../../store/selectors/loginSelector";

export const AgentProtectedRoute = ({ component: Component, render, ...rest }) => {
  const isAuthenticated = useSelector(checkLoginStatus);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          Component ? (
            <Component {...props} />
          ) : (
            render(props)
          )
        ) : (
          <Redirect to={routes.login} />
        )
      }
    />
  );
};
