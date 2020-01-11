import React, { useEffect } from "react";

import { FormNavigation } from "../../components/FormNavigation";
import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import { Notifications, NotificationsProvider } from "../../components/Notification";
import { routerToAddPaddingInSlider } from "../../constants/styles";

import { useStyles } from "./styled";

export const FormLayoutComponent = ({
  location: { key, pathname } = {},
  children,
  screeningResults = {},
  updateViewId
}) => {
  const classes = useStyles({ pathname });

  useEffect(() => {
    updateViewId(pathname);
  }, [key, pathname, updateViewId]);

  return (
    <NotificationsProvider>
      <Header />
      <div className={classes.formLayout}>
        <FormNavigation />
        <div className={classes.formWrapper}>
          <div className={classes.formInner}>
            <div className={classes.mainContainer}>
              {!routerToAddPaddingInSlider.includes(pathname) && <HeaderTitle />}
              <Notifications />

              {children}
            </div>
          </div>
        </div>
      </div>
    </NotificationsProvider>
  );
};
