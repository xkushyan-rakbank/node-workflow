import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cx from "classnames";
import { CircularProgress, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import { ConfirmDialog } from "../../Modals";
import { useStyles } from "./styled";
import { RAK_SAVE_CLOSE_CONFIRM_MESSAGE } from "../../../containers/AccountsComparison/constants";
import routes from "../../../routes";
import { NEXT } from "../../../constants";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import { checkLoginStatus } from "../../../store/selectors/loginSelector";

export const SaveAndClose = ({
  prospectSaveOnClick,
  extraClasses,
  isSmallDeviceSaveCloseBtn = false,
  hideSaveCloseBtn = false
}) => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  const isAgent = useSelector(checkLoginStatus);

  const [isDisplayConfirmDialog, setIsDisplayConfirmDialog] = useState(false);
  const [circularProgress, setCircularProgess] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleSaveAndCloseClick = () => {
    setIsDisplayConfirmDialog(true);
  };

  const handleConfirm = useCallback(() => {
    setCircularProgess(true);
    prospectSaveOnClick(NEXT)
      .then(() => {
        if (isMounted) {
          setIsDisplayConfirmDialog(false);
          setCircularProgess(false);
          if (isAgent) {
            pushHistory(routes.searchProspect, true);
          } else {
            pushHistory(routes.comeBackLogin, true);
          }
        }
      })
      .catch(error => {
        console.log("Error while saving:", error);
        if (isMounted) {
          setIsDisplayConfirmDialog(false);
          setCircularProgess(false);
        }
      });
  }, [isMounted, setIsDisplayConfirmDialog, prospectSaveOnClick, pushHistory]);

  const closeDialogHandler = useCallback(() => {
    setIsDisplayConfirmDialog(false);
    setCircularProgess(false);
  }, [setIsDisplayConfirmDialog]);

  return (
    <div
      className={cx(
        classes.saveCloseContainer,
        {
          [classes.hideSaveCloseBtn]: isSmallDeviceSaveCloseBtn
        },
        extraClasses
      )}
    >
      <div className={classes.saveButtonContainer}>
        <Button
          className={cx(classes.saveCloseBtn, {
            [classes.hideSaveCloseBtn]: hideSaveCloseBtn
          })}
          variant="outlined"
          onClick={handleSaveAndCloseClick}
        >
          Save & close
        </Button>
        <ConfirmDialog
          disableBackdropClick
          disableEscapeKeyDown
          title={null}
          isOpen={isDisplayConfirmDialog}
          handleConfirm={handleConfirm}
          handleClose={closeDialogHandler}
          handleReject={closeDialogHandler}
          message={RAK_SAVE_CLOSE_CONFIRM_MESSAGE}
          cancelLabel="No"
          confirmLabel="Yes"
          divider={false}
          isDisplayBtnLoader={circularProgress}
        />
      </div>
      {circularProgress && (
        <div className={classes.saveCloseProgressContainer}>
          <div className={classes.progressLayout}>
            <CircularProgress className={classes.circularProgress} value={null} />
            <Typography variant="h3" classes={{ root: classes.saveCloseLabel }}>
              Saving your application
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};
