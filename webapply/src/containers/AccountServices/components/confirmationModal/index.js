import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useStyles } from "./styled";

export const ConfirmationDialog = ({
  title,
  message,
  handleClose,
  isOpen,
  handleContinueWithoutAddon,
  handleGoToPackage,
  continueButtonLabel = "Continue Without Addon",
  goToPackageButtonLabel = "Go to Package"
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="draggable-dialog-title"
      classes={{
        container: classes.container,
        paper: title !== null ? classes.paper : classes.noTitlePaper
      }}
    >
      <DialogTitle id="draggable-dialog-title" classes={{ root: classes.title }}>
        <CloseIcon className={classes.iconStyle} onClick={handleClose} />
        {title}
      </DialogTitle>
      <DialogContent classes={{ root: classes.content }}>{message}</DialogContent>
      <DialogActions
        classes={{
          root: classes.dialogActions,
          spacing: classes.buttonSpacing
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          className={classes.actionButton}
          onClick={handleContinueWithoutAddon}
        >
          {continueButtonLabel}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          className={classes.actionButton}
          onClick={handleGoToPackage}
        >
          {goToPackageButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
