import React, { useEffect } from "react";
import { ApplicationStatus } from "../../components/ApplicationStatus/ApplicationStatus";
import { FormNavigation } from "../../components/FormNavigation";
import Header from "../../components/Header";
import { HeaderTitle } from "../../components/HeaderTitle";
import { Notifications, NotificationsProvider } from "../../components/Notification";
import { routerToAddPaddingInSlider } from "../../constants/styles";
import { useStyles } from "./styled";
import { accountNames } from "../../constants";
import routes, { agentBaseName, smeBaseName } from "../../routes";

export const FormLayoutComponent = ({
  location: { key, pathname } = {},
  children,
  screeningResults: { screeningError },
  updateViewId,
  resetScreeningError,
  islamicBanking,
  accountType
}) => {
  const isAccountsComparison = routes.accountsComparison === pathname;
  const classes = useStyles({
    pathname,
    color:
      !isAccountsComparison && accountType === accountNames.elite
        ? "brown"
        : !isAccountsComparison && islamicBanking && accountType !== accountNames.elite
        ? "green"
        : "red"
  });

  useEffect(() => {
    updateViewId(
      pathname.replace(smeBaseName, "").replace(agentBaseName, ""),
      [
        routes.stakeholdersInfo,
        routes.finalQuestions,
        routes.uploadDocuments,
        routes.selectServices,
        routes.SubmitApplication
      ].includes(pathname)
    );
    resetScreeningError();
  }, [key, pathname, updateViewId, resetScreeningError]);

  return (
    <NotificationsProvider>
      <div className={classes.formLayout}>
        <Header />
        <FormNavigation />
        <div className={classes.formWrapper}>
          <div className={classes.formInner}>
            <div className={classes.mainContainer}>
              {!routerToAddPaddingInSlider.includes(pathname) && <HeaderTitle />}

              <Notifications />

              {screeningError.error ? <ApplicationStatus {...screeningError} /> : children}
            </div>
          </div>
        </div>
      </div>
    </NotificationsProvider>
  );
};
