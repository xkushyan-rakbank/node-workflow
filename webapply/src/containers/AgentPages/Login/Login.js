import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { LoginComponent } from "./components/Login";
import { useFormNavigation } from "../../../components/FormNavigation/FormNavigationProvider";
import routes from "../../../routes";
//ro-assist header missing issue fix
import { useLayoutParams } from "../../FormLayout";
import { logout } from "../../../store/actions/loginForm";

export const LoginContainer = ({ login, setIsApplyEditApplication, history }) => {
  useFormNavigation([false, false]);
  useLayoutParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(logout());
  }, []);

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
