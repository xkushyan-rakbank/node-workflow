import React, { useCallback, useEffect, useState } from "react";
import Button from "@material-ui/core/Button/Button";
import { ConfirmDialog } from "../../Modals";
import { useStyles } from "./styled";
import { RAK_SAVE_CLOSE_CONFIRM_MESSAGE } from "../../../containers/AccountsComparison/constants";
import routes from "../../../routes";
import { NEXT } from "../../../constants";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import { CircularProgress, Typography } from "@material-ui/core";

export const SaveAndClose = ({ prospectSaveOnClick }) => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();

  const [isDisplayConfirmDialog, setIsDisplayConfirmDialog] = useState(false);
  const [circularProgress, setCircularProgess] = useState(false);

  const handleSaveAndCloseClick = () => {
    setIsDisplayConfirmDialog(true);
  };

  const handleConfirm = useCallback(() => {
    setCircularProgess(true);
    prospectSaveOnClick(NEXT)
      .then(() => {
        setIsDisplayConfirmDialog(false);
        pushHistory(routes.comeBackLogin, true);
      })
      .catch((error) => {
        console.log("Error while saving:", error);
      })
      .finally(() => {
        setCircularProgess(false);
      });
  }, [setIsDisplayConfirmDialog, prospectSaveOnClick, pushHistory]);

  const closeDialogHandler = useCallback(() => {
    setIsDisplayConfirmDialog(false);
    setCircularProgess(false);
  }, [setIsDisplayConfirmDialog]);

  return (
    <div className={classes.saveCloseContainer}>
      <div className={classes.saveButtonContainer}>
        <Button
          className={classes.saveCloseBtn}
          variant="outlined"
          onClick={handleSaveAndCloseClick}
        >
          Save and exit
        </Button>
        <ConfirmDialog
          title={null}
          isOpen={isDisplayConfirmDialog}
          handleConfirm={handleConfirm}
          handleClose={closeDialogHandler}
          handleReject={closeDialogHandler}
          message={RAK_SAVE_CLOSE_CONFIRM_MESSAGE}
          cancelLabel="No"
          confirmLabel="Yes"
          divider={false}
        />
      </div>
      {circularProgress && (
        <div className={classes.saveCloseProgressContainer}>
          <div className={classes.progressLayout}>
            <CircularProgress size={14} className={classes.circularProgress} value={null} />
            <Typography variant="h3" classes={{ root: classes.saveCloseLabel }}>
              Saving your application
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};
