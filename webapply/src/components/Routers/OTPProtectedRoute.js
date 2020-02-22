import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import routes from "../../routes";
import { isOtpVerified as getIsOtpVerified } from "../../store/selectors/otp";
import { ErrorBoundary } from "./ErrorBoundary";

export const OTPProtectedRoute = ({ component: Component, render, ...rest }) => {
  const isOtpVerified = useSelector(getIsOtpVerified);
  return (
    <Route
      {...rest}
      render={props =>
        isOtpVerified ||
        process.env.REACT_APP_OTP_ENABLE === "N" ||
        process.env.NODE_ENV === "development" ? (
          <ErrorBoundary>{Component ? <Component {...props} /> : render(props)}</ErrorBoundary>
        ) : (
          <Redirect to={routes.comeBackLogin} />
        )
      }
    />
  );
};
