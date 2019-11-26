import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

import routes from "../../../../src/routes";
import { checkLoginStatus } from "./../../../store/selectors/loginSelector";

const AgentProtectedRouteComponent = ({
  component: Component,
  render,
  isAuthenticated,
  ...rest
}) => (
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

const mapStateToProps = state => ({
  isAuthenticated: checkLoginStatus(state)
});

export const AgentProtectedRoute = connect(mapStateToProps)(AgentProtectedRouteComponent);
