import React from "react";
import { useSelector } from "react-redux";

import routes from "../../routes";
import { ComeBackVerificationComponent } from "./components/ComeBackVerification";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { getOtp } from "../../store/selectors/otp";

export const ComeBackVerification = () => {
  useFormNavigation([true, false]);
  const { mode } = useSelector(getOtp);

  return <ComeBackVerificationComponent redirectRoute={routes.MyApplications} otpType={mode} />;
};
