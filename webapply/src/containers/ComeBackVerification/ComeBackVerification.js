import React from "react";

import routes from "../../routes";
import { ComeBackVerificationComponent } from "./components/ComeBackVerification";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";

export const ComeBackVerification = () => {
  useFormNavigation([true, false]);

  return <ComeBackVerificationComponent redirectRoute={routes.MyApplications} />;
};
