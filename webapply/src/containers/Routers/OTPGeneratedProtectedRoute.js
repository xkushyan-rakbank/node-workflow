import React from "react";
import { useSelector } from "react-redux";

import { RedirectRoute } from "./components/RedirectRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import routes from "../../routes";
import { isOtpGenerated as getIsOtpGenerated } from "../../store/selectors/otp";

export const OTPGeneratedProtectedRoute = props => {
  const isOtpGenerated = useSelector(getIsOtpGenerated);

  if (process.env.REACT_APP_OTP_ENABLE === "N" || isOtpGenerated) {
    return <ProtectedRoute {...props} />;
  }

  return <RedirectRoute to={routes.comeBackLogin} />;
};
