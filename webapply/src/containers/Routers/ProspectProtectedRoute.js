import React from "react";
import { useSelector } from "react-redux";

import { RedirectRoute, ProtectedRoute } from "../../components/Routes";
import routes from "../../routes";
import { getProspectId } from "../../store/selectors/appConfig";
import { checkLoginStatus } from "../../store/selectors/loginSelector";

export const ProspectProtectedRoute = props => {
  const isAgent = useSelector(checkLoginStatus);
  const prospectId = useSelector(getProspectId);

  if (prospectId) {
    return <ProtectedRoute {...props} />;
  }

  if (isAgent) {
    return <RedirectRoute to={routes.login} />;
  }

  return <RedirectRoute to={routes.comeBackLogin} />;
};
