import React, { useCallback } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useStyles } from "./styled";

export const ConfirmDialog = ({ message, handleClose, isOpen, handleConfirm, handleReject }) => {
  const classes = useStyles();
  const confirmHandler = useCallback(() => {
    handleConfirm();
  }, [handleConfirm]);
  const rejectHandler = useCallback(() => {
    handleReject();
  }, [handleReject]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      classes={{ container: classes.container, paper: classes.paper }}
    >
      <DialogTitle id="draggable-dialog-title" classes={{ root: classes.title }}>
        Are you sure?
      </DialogTitle>
      <DialogContent classes={{ root: classes.content }}>{message}</DialogContent>
      <div className={classes.divider} />
      <DialogActions classes={{ root: classes.dialogActions, spacing: classes.buttonSpacing }}>
        <Button
          onClick={rejectHandler}
          color="primary"
          variant="outlined"
          className={classes.actionButton}
        >
          Cancel
        </Button>
        <Button
          onClick={confirmHandler}
          color="primary"
          variant="contained"
          className={classes.actionButton}
        >
          Yes, I{"'"}m sure
        </Button>
      </DialogActions>
    </Dialog>
  );
};
