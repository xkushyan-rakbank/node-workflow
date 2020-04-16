import React from "react";
import { useSelector } from "react-redux";

import { RedirectRoute, ProtectedRoute } from "../../components/Routes";
import routes from "../../routes";
import {
  isOtpVerified as getIsOtpVerified,
  isOtpGenerated as getIsOtpGenerated
} from "../../store/selectors/otp";

export const OTPProtectedRoute = props => {
  const isOtpVerified = useSelector(getIsOtpVerified);
  const isOtpGenerated = useSelector(getIsOtpGenerated);

  if (isOtpVerified || (process.env.REACT_APP_OTP_ENABLE === "N" && isOtpGenerated)) {
    return <ProtectedRoute {...props} />;
  }

  return <RedirectRoute to={routes.comeBackLogin} />;
};
