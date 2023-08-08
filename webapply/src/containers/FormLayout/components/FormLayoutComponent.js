import React, { useContext } from "react";
import cx from "classnames";

import { FormNavigation } from "../../../components/FormNavigation";
import { checkIsShowSmallMenu, isFooterFixed } from "../../../components/FormNavigation/utils";
import { HeaderTitle } from "../../../components/HeaderTitle";
import { Notifications } from "../../../components/Notification";
import { ApplicationStatus } from "../../../components/ApplicationStatus/ApplicationStatus";

import { ERROR_MESSAGES, VIEW_IDS } from "../../../constants";
import { useBlobColor } from "../../../utils/useBlobColor/useBlobColor";
import { LayoutContext } from "../LayoutProvider";

import { useStyles } from "./styled";
import routes from "../../../routes";
import { HeaderButtonGroup } from "../../../components/HeaderButtonGroup";
import SaveAndClose from "../../../components/SaveAndClose";

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

  const showSaveClose = Object.values(VIEW_IDS).some(screen => pathname.includes(screen));

  return pathname === routes.quickapplyLanding || pathname === "/" ? (
    <>{children}</>
  ) : (
    <div className={classes.formLayout}>
      <FormNavigation />
      <div className={classes.formWrapper}>
        <div className={classes.formInner}>
          {showSaveClose && <SaveAndClose isSmallDeviceSaveCloseBtn={true}/>}
          {pathname.includes("application-overview") && <HeaderButtonGroup />}

          <div
            className={cx(classes.mainContainer, {
              [classes.paddingBottomForm]: isFooterFixed(pathname)
            })}
          >
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
