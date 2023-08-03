import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import routes from "../../routes";

export const ApplicationInvitation = () => {
  useFormNavigation([false, false]);
  const history = useHistory();

  const queryString = useLocation().search;

  const queryParams = new URLSearchParams(queryString);

  const invitationParams = {};

  for (const [key, value] of queryParams.entries()) {
    invitationParams[key] = value;
  }

  useEffect(() => {
    history.push({
      pathname: routes.applicantInfo,
      state: { invitationParams }
    });
  }, [history, invitationParams]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};
