import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { FormNavigation } from "../../../components/FormNavigation";
import { HeaderTitle } from "../../../components/HeaderTitle";
import { Notifications } from "../../../components/Notification";
import { ApplicationStatus } from "../../../components/ApplicationStatus/ApplicationStatus";

import { ERROR_MESSAGES } from "../../../constants";
import { checkIsShowSmallMenu } from "../../../components/FormNavigation/utils";

import { useStyles } from "./styled";
import { useBlobColor } from "../../../utils/useBlobColor/useBlobColor";

export const FormLayoutComponent = ({
  isDisplayHeader,
  isDisplayScreeningError,
  screeningError,
  errorCode,
  errorIcon,
  children
}) => {
  const blobColor = useBlobColor();
  const { pathname } = useLocation();
  const classes = useStyles({
    isDisplayHeader,
    color: blobColor,
    isFullContentWidth: checkIsShowSmallMenu(pathname)
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
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
              <ApplicationStatus icon={errorIcon} text={ERROR_MESSAGES[errorCode]} />
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
