import React from "react";
import { useSelector } from "react-redux";

import { RedirectRoute } from "./components/RedirectRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import routes from "../../routes";
import { getProspectId } from "../../store/selectors/appConfig";
import { checkLoginStatus } from "../../store/selectors/loginSelector";

export const ProspectProtectedRoute = props => {
  const isAgent = useSelector(checkLoginStatus);
  const prospectId = useSelector(getProspectId);

  if (prospectId) {
    return <ProtectedRoute {...props} />;
  }

  return <RedirectRoute to={isAgent ? routes.login : routes.comeBackLogin} />;
};
