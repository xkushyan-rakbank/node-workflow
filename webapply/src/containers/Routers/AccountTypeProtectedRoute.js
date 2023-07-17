import React from "react";

import { RedirectRoute } from "./components/RedirectRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import routes from "../../routes";
import { accountTypeURIs } from "../../constants";

export const AccountTypeProtectedRoute = props => {
  if (!Object.keys(accountTypeURIs).includes(props.computedMatch.params.accountType)) {
    return <RedirectRoute to={routes.quickapplyLanding} />;
  }

  return <ProtectedRoute {...props} />;
};
