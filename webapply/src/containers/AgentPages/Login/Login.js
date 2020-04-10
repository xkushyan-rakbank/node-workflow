import React, { useCallback, useState } from "react";
import { LoginComponent } from "./components/Login";
import { useFormNavigation } from "../../../components/FormNavigation/FormNavigationProvider";
import routes from "../../../routes";

export const LoginContainer = ({ login, setIsApplyEditApplication, history }) => {
  useFormNavigation([false, false]);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = useCallback(
    values => {
      let loginData = { ...values };
      setIsLoading(true);

      return login(loginData).then(
        () => {
          setIsApplyEditApplication(true);
          setIsLoading(false);
          history.push(routes.searchProspect);
        },
        () => {
          setIsLoading(false);
        }
      );
    },
    [login, history, setIsApplyEditApplication]
  );

  return <LoginComponent isLoading={isLoading} submitForm={submitForm} />;
};
