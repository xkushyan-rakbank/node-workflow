import React from "react";

import { RedirectRoute, ProtectedRoute } from "../../components/Routes";
import routes from "../../routes";
import { accountTypeURIs } from "../../constants";

export const AccountTypeProtectedRoute = props => {
  if (!Object.keys(accountTypeURIs).includes(props.computedMatch.params.accountType)) {
    return <RedirectRoute to={routes.accountsComparison} />;
  }

  return <ProtectedRoute {...props} />;
};
