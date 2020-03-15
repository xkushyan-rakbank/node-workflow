import React from "react";

import routes from "../../routes";
import { OTPform } from "../../components/OTPform";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";

export const ComeBackVerification = () => {
  useFormNavigation([false, false]);

  return <OTPform redirectRoute={routes.MyApplications} />;
};
