import React, { useEffect } from "react";
import { Providers } from "./Providers";
import { ApplicationStatus } from "../../components/ApplicationStatus/ApplicationStatus";
import { FormNavigation } from "../../components/FormNavigation";
import { HeaderTitle } from "../../components/HeaderTitle";
import { Notifications } from "../../components/Notification";
import { routerToAddPaddingInSlider } from "../../constants/styles";
import { SAVE } from "../../constants";
import { checkIsShowSmallMenu } from "../../components/FormNavigation/utils";
import { useStyles } from "./styled";
import { ERRORS_TYPE } from "../../utils/getErrorScreenIcons/constants";
import { getErrorScreensIcons } from "../../utils/getErrorScreenIcons/getErrorScreenIcons";
import { useBlobColor } from "../../utils/useBlobColor/useBlobColor";
import routes, { agentBaseName, smeBaseName } from "../../routes";
import { MobileNotification } from "../../components/Notifications";

export const FormLayoutComponent = ({
  location: { pathname } = {},
  children,
  screeningError,
  updateViewId,
  accountType,
  isIslamicBanking,
  isLockStatusByROAgent,
  updateActionType
}) => {
  const blobColor = useBlobColor();
  const classes = useStyles({
    pathname,
    color: blobColor,
    fullContentWidth: checkIsShowSmallMenu(pathname)
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

    if (isSendToApi) updateActionType(SAVE);

    updateViewId(viewId, isSendToApi);
  }, [pathname, updateViewId]);

  const isDisplayScreeningError =
    screeningError.error &&
    [
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

                {isDisplayScreeningError ? (
                  <ApplicationStatus {...screeningError} />
                ) : isLockStatusByROAgent ? (
                  <ApplicationStatus
                    icon={getErrorScreensIcons(
                      accountType,
                      isIslamicBanking,
                      ERRORS_TYPE.RO_EDITING
                    )}
                    text="We noticed that your application is incomplete. Not to worry, our team is already working on it."
                  />
                ) : (
                  children
                )}
              </div>
            </div>
          </div>
        </div>
      </MobileNotification>
    </Providers>
  );
};
