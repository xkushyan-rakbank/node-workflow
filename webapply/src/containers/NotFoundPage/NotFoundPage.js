import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { NotFoundComponent } from "./components/NotFoundComponent";
import routes from "../../routes";

export const NotFoundPage = () => {
  const history = useHistory();
  useFormNavigation([false, false]);

  const handleGoToHomePage = useCallback(() => {
    history.push(routes.accountsComparison);
  }, [history]);

  return <NotFoundComponent goToHomePage={handleGoToHomePage} />;
};
