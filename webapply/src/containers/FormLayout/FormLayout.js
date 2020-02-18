import React, { useEffect } from "react";
import { ApplicationStatus } from "../../components/ApplicationStatus/ApplicationStatus";
import { FormNavigation } from "../../components/FormNavigation";
import { HeaderTitle } from "../../components/HeaderTitle";
import { Notifications, NotificationsProvider } from "../../components/Notification";
import { routerToAddPaddingInSlider } from "../../constants/styles";
import { useStyles } from "./styled";
import { useBlobColor } from "../../utils/useBlobColor/useBlobColor";
import routes, { agentBaseName, smeBaseName } from "../../routes";
import { MobileNotification } from "../../components/Notifications";

export const FormLayoutComponent = ({
  location: { key, pathname } = {},
  children,
  screeningResults: { screeningError },
  updateViewId,
  resetScreeningError
}) => {
  const blobColor = useBlobColor();
  const classes = useStyles({
    pathname,
    color: blobColor
  });

  useEffect(() => {
    const viewId = pathname.replace(smeBaseName, "").replace(agentBaseName, "");
    const isSendToApi = [
      routes.companyInfo,
      routes.stakeholdersInfo,
      routes.finalQuestions,
      routes.uploadDocuments,
      routes.selectServices,
      routes.SubmitApplication
    ].includes(pathname);

    updateViewId(viewId, isSendToApi);
    resetScreeningError();
  }, [key, pathname, updateViewId, resetScreeningError]);

  return (
    <NotificationsProvider>
      <MobileNotification />
      <div className={classes.formLayout}>
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
