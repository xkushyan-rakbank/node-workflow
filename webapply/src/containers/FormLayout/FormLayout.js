import React, { useEffect } from "react";
import { ApplicationStatus } from "../../components/ApplicationStatus/ApplicationStatus";
import { FormNavigation } from "../../components/FormNavigation";
import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import { Notifications, NotificationsProvider } from "../../components/Notification";
import { routerToAddPaddingInSlider } from "../../constants/styles";
import { useStyles } from "./styled";

export const FormLayoutComponent = ({
  location: { key, pathname } = {},
  children,
  screeningResults: { screeningError },
  updateViewId,
  resetScreeningError
}) => {
  const classes = useStyles({ pathname });

  useEffect(() => {
    updateViewId(pathname);
    resetScreeningError();
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

              {screeningError ? <ApplicationStatus {...screeningError} /> : children}
            </div>
          </div>
        </div>
      </div>
    </NotificationsProvider>
  );
};
