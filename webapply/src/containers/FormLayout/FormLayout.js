import React from "react";
import { useLocation } from "react-router-dom";

import { Providers } from "./components/Providers";
import { MobileNotification } from "../../components/Notifications";
import { FormLayoutComponent } from "./components/FormLayoutComponent";

import { ERRORS_TYPE } from "../../utils/getErrorScreenIcons/constants";
import { getErrorScreensIcons } from "../../utils/getErrorScreenIcons/getErrorScreenIcons";
import routes, { agentBaseName, smeBaseName } from "../../routes";

export const FormLayoutContainer = ({
  children,
  screeningError,
  updateViewId,
  accountType,
  isIslamicBanking,
  errorCode
}) => {
  const { pathname } = useLocation();

  React.useEffect(() => {
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

  const isDisplayHeader = [
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

  const errorIcon = getErrorScreensIcons(accountType, isIslamicBanking, ERRORS_TYPE.BLOCK_EDITING);

  return (
    <Providers>
      <MobileNotification>
        <FormLayoutComponent
          errorCode={errorCode}
          isDisplayHeader={isDisplayHeader}
          isDisplayScreeningError={isDisplayScreeningError}
          errorIcon={errorIcon}
        >
          {children}
        </FormLayoutComponent>
      </MobileNotification>
    </Providers>
  );
};
