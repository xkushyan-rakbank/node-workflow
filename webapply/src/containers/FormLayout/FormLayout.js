import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { ApplicationError } from "../../components/ApplicationStatus/ApplicationError";
import { Providers } from "./components/Providers";
import { MobileNotification } from "../../components/Notifications";
import { FormLayoutComponent } from "./components/FormLayoutComponent";
import { ERROR_MESSAGES } from "../../constants";
import { ERRORS_TYPE } from "../../utils/getErrorScreenIcons/constants";
import { getErrorScreensIcons } from "../../utils/getErrorScreenIcons/getErrorScreenIcons";
import { getIsLemniskEnable } from "../../store/selectors/appConfig";

export const FormLayoutContainer = ({
  children,
  screeningError,
  accountType,
  isIslamicBanking,
  errorCode
}) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Helmet>
        {useSelector(getIsLemniskEnable) && (
          <script
            type="text/javascript"
            src="https://cdn25.lemnisk.co/ssp/st/5473.js"
            async
            defer
          ></script>
        )}
      </Helmet>
      <Providers>
        <MobileNotification>
          {!screeningError.error && (
            <FormLayoutComponent
              errorCode={errorCode}
              errorIcon={getErrorScreensIcons(
                accountType,
                isIslamicBanking,
                ERRORS_TYPE.BLOCK_EDITING
              )}
              pathname={pathname}
              screeningError={screeningError}
            >
              {children}
            </FormLayoutComponent>
          )}
          {screeningError.error ? (
            <ApplicationError {...screeningError} />
          ) : (
            errorCode && <ApplicationError text={ERROR_MESSAGES[errorCode]} />
          )}
        </MobileNotification>
      </Providers>
    </>
  );
};
