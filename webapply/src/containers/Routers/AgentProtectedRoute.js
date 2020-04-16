import React from "react";
import { useSelector } from "react-redux";

import { RedirectRoute } from "./components/RedirectRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import routes from "../../routes";
import { checkLoginStatus } from "../../store/selectors/loginSelector";
import { getAuthToken } from "../../store/selectors/appConfig";

export const AgentProtectedRoute = props => {
  const isAuthenticated = useSelector(checkLoginStatus);
  const authToken = useSelector(getAuthToken);

  if (isAuthenticated && authToken) {
    return <ProtectedRoute {...props} />;
  }

  return <RedirectRoute to={routes.login} />;
};
