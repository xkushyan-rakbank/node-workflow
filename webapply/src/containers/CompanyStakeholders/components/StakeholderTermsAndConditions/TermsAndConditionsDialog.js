import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";
import { isDesktop } from "react-device-detect";
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
  scrollToEnd = false
}) {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(scrollToEnd);

  const handleScroll = event => {
    if (!scrollToEnd) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight + 20 >= scrollHeight) {
      setDisabled(false);
    }
  };

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
        {isDesktop ? (
          <div style={{ height: `${height}px` }}>
            <object
              type="application/pdf"
              data={`${editedFile}#toolbar=0`}
              aria-label="Passport"
              onContextMenu={e => e.preventDefault()}
              className={classes.previewPDF}
              border="0"
            ></object>
          </div>
        ) : (
          <PdfPreview file={editedFile} pages={pages} />
        )}
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions, spacing: classes.buttonSpacing }}>
        <div className={classes.actionContainer}>
          <Button
            withRightArrow
            className={classes.agreeButton}
            disabled={disabled}
            label="Accept and continue"
            onClick={handleAccept}
          />
          {scrollToEnd && (
            <span className={classes.scrollInstruction}>
              Please scroll all the way through to accept.
            </span>
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
}
