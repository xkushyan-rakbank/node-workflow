import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useStyles } from "./styled";

export const ROEditNotification = ({ message, handleClose, isOpen }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      classes={{ container: classes.container, paper: classes.paper }}
    >
      <DialogTitle id="draggable-dialog-title" classes={{ root: classes.title }}>
        RO start editing your application.
      </DialogTitle>
      <div className={classes.divider} />
      <DialogActions classes={{ root: classes.dialogActions, spacing: classes.buttonSpacing }}>
        <Button
          onClick={handleClose}
          color="primary"
          variant="outlined"
          className={classes.actionButton}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
