import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Providers } from "./components/Providers";
import { MobileNotification } from "../../components/Notifications";
import { FormLayoutComponent } from "./components/FormLayoutComponent";
import { ERRORS_TYPE } from "../../utils/getErrorScreenIcons/constants";
import { getErrorScreensIcons } from "../../utils/getErrorScreenIcons/getErrorScreenIcons";

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
    <Providers>
      <MobileNotification>
        <FormLayoutComponent
          errorCode={errorCode}
          errorIcon={getErrorScreensIcons(accountType, isIslamicBanking, ERRORS_TYPE.BLOCK_EDITING)}
          pathname={pathname}
          screeningError={screeningError}
        >
          {children}
        </FormLayoutComponent>
      </MobileNotification>
    </Providers>
  );
};
