import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import cx from "classnames";

import { useStyles } from "./styled";

export const OverwriteAlert = ({ message, handleClose, isOpen, handleConfirm }) => {
  const classes = useStyles();

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
      <DialogActions classes={{ root: classes.dialogActions, spacing: classes.buttonSpacing }}>
        <Button
          onClick={handleClose}
          color="primary"
          variant="outlined"
          className={classes.actionButton}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          className={cx(classes.actionButton, classes.marginTop12)}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
