import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import routes from "../../routes";
import { getIsOtpVerified } from "../../store/selectors/otp";

export const OTPProtectedRoute = ({ component: Component, render, ...rest }) => {
  const isOtpVerified = useSelector(getIsOtpVerified);

  return (
    <Route
      {...rest}
      render={props =>
        isOtpVerified || process.env.NODE_ENV === "development" ? (
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
