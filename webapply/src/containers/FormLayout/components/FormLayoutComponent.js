import React from "react";

import { FormNavigation } from "../../../components/FormNavigation";
import { HeaderTitle } from "../../../components/HeaderTitle";
import { Notifications } from "../../../components/Notification";
import { ApplicationStatus } from "../../../components/ApplicationStatus/ApplicationStatus";

import { ERROR_MESSAGES } from "../../../constants";
import { useBlobColor } from "../../../utils/useBlobColor/useBlobColor";

import { useStyles } from "./styled";

export const FormLayoutComponent = ({
  isDisplayHeader,
  isDisplayScreeningError,
  screeningError,
  errorCode,
  errorIcon,
  isVerticalPagination,
  isSmallContentWidth,
  children
}) => {
  const blobColor = useBlobColor();
  const classes = useStyles({
    isDisplayHeader,
    color: blobColor,
    isVerticalPagination,
    isSmallContentWidth
  });

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
