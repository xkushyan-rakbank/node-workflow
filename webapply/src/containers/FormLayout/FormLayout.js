import React, { useEffect } from "react";

import { FormNavigation } from "../../components/FormNavigation";
import { ApplicationStatus } from "../../components/ApplicationStatus/ApplicationStatus";
import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import { Notifications, NotificationsProvider } from "../../components/Notification";
import { routerToAddPaddingInSlider } from "../../constants/styles";
import { APP_STOP_SCREEN_RESULT } from "./constants";

import { useStyles } from "./styled";

export const FormLayoutComponent = ({
  location: { key, pathname } = {},
  children,
  screeningResults = {},
  updateViewId,
  name,
  mobileNo,
  countryCode,
  email
}) => {
  const classes = useStyles({ pathname });
  const mobileNumber = `${countryCode + mobileNo}`;

  useEffect(() => {
    updateViewId(pathname);
  }, [key, pathname, updateViewId]);

  return (
    <NotificationsProvider>
      <Header />
      <div className={classes.formLayout}>
        <FormNavigation name={name} mobileNumber={mobileNumber} email={email} />
        <div className={classes.formWrapper}>
          <div className={classes.formInner}>
            <div className={classes.mainContainer}>
              {!routerToAddPaddingInSlider.includes(pathname) && <HeaderTitle />}
              <Notifications />
              {screeningResults.statusOverAll === APP_STOP_SCREEN_RESULT ? (
                <ApplicationStatus statusFromServer={screeningResults} />
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </div>
    </NotificationsProvider>
  );
};
