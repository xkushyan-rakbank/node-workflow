import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Providers } from "./components/Providers";
import { MobileNotification } from "../../components/Notifications";
import { FormLayoutComponent } from "./components/FormLayoutComponent";
import { checkIsShowSmallMenu } from "../../components/FormNavigation/utils";

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

  useEffect(() => {
    const viewId = pathname.replace(smeBaseName, "").replace(agentBaseName, "");
    const isSendToApi = [
      routes.companyInfo,
      routes.stakeholdersInfo,
      routes.finalQuestions,
      routes.selectServices,
      routes.SubmitApplication
    ].includes(pathname);

    updateViewId(viewId, isSendToApi);
  }, [pathname, updateViewId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  return (
    <Providers>
      <MobileNotification>
        <FormLayoutComponent
          errorCode={errorCode}
          isDisplayHeader={isDisplayHeader}
          isDisplayScreeningError={isDisplayScreeningError}
          errorIcon={getErrorScreensIcons(accountType, isIslamicBanking, ERRORS_TYPE.BLOCK_EDITING)}
          isFullContentWidth={checkIsShowSmallMenu(pathname)}
        >
          {children}
        </FormLayoutComponent>
      </MobileNotification>
    </Providers>
  );
};
