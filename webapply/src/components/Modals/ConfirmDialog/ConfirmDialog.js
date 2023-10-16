import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import cx from "classnames";

import { ReactComponent as Loader } from "../../../assets/icons/loader.svg";
import { useStyles } from "./styled";

export const ConfirmDialog = ({
  title = "Are you sure?",
  message,
  handleClose,
  isOpen,
  handleConfirm,
  cancelLabel = "Cancel",
  confirmLabel = "Yes, I'm sure",
  divider = true,
  isDisplayBtnLoader = false
}) => {
  const classes = useStyles();

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      classes={{
        container: classes.container,
        paper: title !== null ? classes.paper : classes.noTitlePaper
      }}
    >
      {title !== null && (
        <DialogTitle id="draggable-dialog-title" classes={{ root: classes.title }}>
          {title}
        </DialogTitle>
      )}
      <DialogContent classes={{ root: classes.content }}>{message}</DialogContent>
      {divider && <div className={classes.divider} />}
      <DialogActions classes={{ root: classes.dialogActions, spacing: classes.buttonSpacing }}>
        {handleClose && (
          <Button
            onClick={handleClose}
            color="primary"
            variant="outlined"
            className={classes.actionButton}
            disabled={isDisplayBtnLoader}
          >
            {cancelLabel}
          </Button>
        )}
        {handleConfirm && (
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            className={cx(classes.actionButton, classes.marginTop12)}
          >
            {isDisplayBtnLoader ? (
              <Loader className={classes.loader} alt="loading" />
            ) : (
              confirmLabel
            )}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
