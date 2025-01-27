import React, { useContext } from "react";

import { FormNavigation } from "../../../components/FormNavigation";
import { checkIsShowSmallMenu } from "../../../components/FormNavigation/utils";
import { HeaderTitle } from "../../../components/HeaderTitle";
import { Notifications } from "../../../components/Notification";
import { ApplicationStatus } from "../../../components/ApplicationStatus/ApplicationStatus";

import { ERROR_MESSAGES } from "../../../constants";
import { useBlobColor } from "../../../utils/useBlobColor/useBlobColor";
import { LayoutContext } from "../LayoutProvider";

import { useStyles } from "./styled";

export const FormLayoutComponent = ({
  screeningError,
  errorCode,
  errorIcon,
  pathname,
  children
}) => {
  const [
    isDisplayHeader = false,
    isDisplayScreeningError = false,
    hasVerticalPagination = false
  ] = useContext(LayoutContext);
  const blobColor = useBlobColor();
  const classes = useStyles({
    isDisplayHeader,
    color: blobColor,
    hasVerticalPagination,
    isSmallContentWidth: !checkIsShowSmallMenu(pathname)
  });

  return (
    <div className={classes.formLayout}>
      <FormNavigation />
      <div className={classes.formWrapper}>
        <div className={classes.formInner}>
          <div className={classes.mainContainer}>
            {isDisplayHeader && <HeaderTitle withoutMarginBottom />}

            <Notifications />

            {screeningError.error && isDisplayScreeningError ? (
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
