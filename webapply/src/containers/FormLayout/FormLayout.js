import React, { useEffect, useState, useCallback } from "react";
import { Providers } from "./Providers";
import { ApplicationStatus } from "../../components/ApplicationStatus/ApplicationStatus";
import { FormNavigation } from "../../components/FormNavigation";
import { HeaderTitle } from "../../components/HeaderTitle";
import { Notifications } from "../../components/Notification";
import { routerToAddPaddingInSlider } from "../../constants/styles";
import { checkIsShowSmallMenu } from "../../components/FormNavigation/utils";
import { useStyles } from "./styled";
import { useBlobColor } from "../../utils/useBlobColor/useBlobColor";
import routes, { agentBaseName, smeBaseName } from "../../routes";
import { MobileNotification } from "../../components/Notifications";
import { ROEditNotification } from "../../components/Modals";

export const FormLayoutComponent = ({
  location: { pathname } = {},
  children,
  screeningError,
  updateViewId,
  setLockStatusByROAgent,
  isLockStatusByROAgent
}) => {
  const blobColor = useBlobColor();
  const classes = useStyles({
    pathname,
    color: blobColor,
    fullContentWidth: checkIsShowSmallMenu(pathname)
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (isLockStatusByROAgent) {
      setOpen(true);
    }
  }, [open, setOpen, isLockStatusByROAgent]);

  const handleClose = useCallback(() => {
    setLockStatusByROAgent(false);
    setOpen(false);
  }, [setOpen, setLockStatusByROAgent]);

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
  }, [pathname, updateViewId]);

  const isDisplayScreeningError = [
    routes.companyInfo,
    routes.stakeholdersInfo,
    routes.finalQuestions,
    routes.uploadDocuments,
    routes.selectServices,
    routes.SubmitApplication
  ].includes(pathname);

  return (
    <Providers>
      <MobileNotification>
        <div className={classes.formLayout}>
          <FormNavigation />
          <div className={classes.formWrapper}>
            <div className={classes.formInner}>
              <div className={classes.mainContainer}>
                {!routerToAddPaddingInSlider.includes(pathname) && <HeaderTitle />}

                <Notifications />

                {isDisplayScreeningError && screeningError.error ? (
                  <ApplicationStatus {...screeningError} />
                ) : (
                  children
                )}
                <ROEditNotification isOpen={open} handleClose={handleClose} />
              </div>
            </div>
          </div>
        </div>
      </MobileNotification>
    </Providers>
  );
};
