import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "./styled";
import { Button } from "../../../../components/Buttons/SubmitButton";

export default function TermsAndConditionsDialog({ open, handleClose, handleAccept }) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{
        container: classes.container,
        paper: classes.noTitlePaper
      }}
    >
      <DialogTitle>
        <CloseIcon onClick={handleClose} className={classes.uploadModalCloseIcon} />
      </DialogTitle>
      <DialogContent classes={{ root: classes.content }}>asdsadsa</DialogContent>
      <DialogActions classes={{ root: classes.dialogActions, spacing: classes.buttonSpacing }}>
        <div className={classes.actionContainer}>
          <Button
            withRightArrow
            className={classes.agreeButton}
            disabled={true}
            label="Accept and continue"
            onClick={handleAccept}
          />
          <span className={classes.scrollInstruction}>
            Please scroll all the way through to accept.
          </span>
        </div>
      </DialogActions>
    </Dialog>
  );
}
