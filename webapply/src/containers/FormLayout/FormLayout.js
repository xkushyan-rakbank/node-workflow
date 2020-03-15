import React, { useEffect } from "react";
import { Providers } from "./Providers";
import { ApplicationStatus } from "../../components/ApplicationStatus/ApplicationStatus";
import { FormNavigation } from "../../components/FormNavigation";
import { HeaderTitle } from "../../components/HeaderTitle";
import { Notifications } from "../../components/Notification";
import { checkIsShowSmallMenu } from "../../components/FormNavigation/utils";
import { ERRORS_TYPE } from "../../utils/getErrorScreenIcons/constants";
import { ERROR_MESSAGES } from "../../constants";
import { getErrorScreensIcons } from "../../utils/getErrorScreenIcons/getErrorScreenIcons";
import { useBlobColor } from "../../utils/useBlobColor/useBlobColor";
import routes, { agentBaseName, smeBaseName } from "../../routes";
import { MobileNotification } from "../../components/Notifications";
import { useStyles } from "./styled";

export const FormLayoutComponent = ({
  location: { pathname } = {},
  children,
  screeningError,
  updateViewId,
  accountType,
  isIslamicBanking,
  errorCode
}) => {
  const blobColor = useBlobColor();

  const isDisplayHeader = [
    routes.MyApplications,
    routes.comeBackLoginVerification,
    routes.verifyOtp,
    routes.applicantInfo,
    routes.companyInfo,
    routes.stakeholdersInfo,
    routes.finalQuestions,
    routes.uploadDocuments,
    routes.selectServices,
    routes.SubmitApplication,
    routes.reUploadDocuments,
    routes.ApplicationSubmitted,
    routes.searchProspect,
    routes.SearchedAppInfo
  ].includes(pathname);

  const classes = useStyles({
    isDisplayHeader,
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
                {isDisplayHeader && <HeaderTitle />}

                <Notifications />

                {isDisplayScreeningError ? (
                  <ApplicationStatus {...screeningError} />
                ) : errorCode ? (
                  <ApplicationStatus
                    icon={getErrorScreensIcons(
                      accountType,
                      isIslamicBanking,
                      ERRORS_TYPE.BLOCK_EDITING
                    )}
                    text={ERROR_MESSAGES[errorCode]}
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
