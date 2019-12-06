import React, { useEffect } from "react";

import FormNavigation from "../../components/FormNavigation";
import ApplicationStatus from "../../components/ApplicationStatus";
import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import { Notifications } from "../../components/Notifications/index";
import { routerToAddPaddingInSlider } from "../../constants/styles";
import { APP_STOP_SCREEN_RESULT } from "./constants";

import { useStyles } from "./styled";

export const FormLayoutComponent = ({
  location: { key, pathname } = {},
  children,
  screeningResults: { statusOverAll } = {},
  screeningResults,
  updateViewId
}) => {
  const classes = useStyles({ pathname });

  useEffect(() => {
    updateViewId(pathname);
  }, [key, pathname, updateViewId]);

  return (
    <>
      <Header />
      <div className={classes.formLayout}>
        <FormNavigation />
        <div className={classes.formWrapper}>
          <div className={classes.formInner}>
            <div className={classes.mainContainer}>
              {!routerToAddPaddingInSlider.includes(pathname) && <HeaderTitle />}
              <Notifications />
              {statusOverAll === APP_STOP_SCREEN_RESULT ? (
                <ApplicationStatus statusFromServer={screeningResults} />
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
