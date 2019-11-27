import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import routes from "../../routes";
import { getProspectId } from "../../store/selectors/appConfig";

export const ProspectProtectedRoute = ({ component: Component, render, ...rest }) => {
  const prospectId = useSelector(getProspectId);

  return (
    <Route
      {...rest}
      render={props =>
        prospectId || process.env.NODE_ENV === "development" ? (
          Component ? (
            <Component {...props} />
          ) : (
            render(props)
          )
        ) : (
          <Redirect to={routes.comeBackLogin} />
        )
      }
    />
  );
};
