import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import routes from "../../routes";
import {
  isOtpVerified as getIsOtpVerified,
  isOtpGenerated as getIsOtpGenerated
} from "../../store/selectors/otp";
import { ErrorBoundary } from "../../components/ErrorBoundary";

export const OTPProtectedRoute = ({ component: Component, render, ...rest }) => {
  const isOtpVerified = useSelector(getIsOtpVerified);
  const isOtpGenerated = useSelector(getIsOtpGenerated);
  return (
    <Route
      {...rest}
      render={props =>
        isOtpVerified ||
        /* istanbul ignore next */
        (process.env.REACT_APP_OTP_ENABLE === "N" && isOtpGenerated) ||
        process.env.NODE_ENV === "development" ? (
          <ErrorBoundary>{Component ? <Component {...props} /> : render(props)}</ErrorBoundary>
        ) : (
          <Redirect to={routes.comeBackLogin} />
        )
      }
    />
  );
};
