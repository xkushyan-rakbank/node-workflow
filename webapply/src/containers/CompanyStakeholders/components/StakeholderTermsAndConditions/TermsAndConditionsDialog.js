import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles } from "./styled";
import { Button } from "../../../../components/Buttons/SubmitButton";
import { PdfPreview } from "./PDFconverter";

export default function TermsAndConditionsDialog({
  open,
  handleClose,
  handleAccept,
  editedFile,
  height,
  pages,
  scrollToEnd = false,
  isAccepted = false,
  showInstructionText = ""
}) {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(scrollToEnd);
  const [isPDFLoaded, setIsPDFLoaded] = useState(false);

  const handleScroll = event => {
    if (!scrollToEnd) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight + 20 >= scrollHeight) {
      setDisabled(false);
    }
  };

  const onPDFloadSuccess = useCallback(() => {
    setIsPDFLoaded(true);
  }, []);

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
      <DialogContent classes={{ root: classes.content }} onScroll={handleScroll}>
        <PdfPreview file={editedFile} pages={pages} onPDFloadSuccess={onPDFloadSuccess} />
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions, spacing: classes.buttonSpacing }}>
        <div className={classes.actionContainer}>
          {handleAccept && (
            <>
              <Button
                withRightArrow
                className={classes.agreeButton}
                disabled={!isPDFLoaded || disabled || isAccepted}
                label="Accept and continue"
                onClick={handleAccept}
              />
              {scrollToEnd && (
                <span className={classes.scrollInstruction}>
                  Please scroll all the way through to accept.
                </span>
              )}
            </>
          )}
          {showInstructionText && (
            <span className={classes.scrollInstruction}>{showInstructionText}</span>
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
}
