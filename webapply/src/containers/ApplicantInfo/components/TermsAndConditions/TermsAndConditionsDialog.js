import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { isDesktop } from "react-device-detect";
import { useStyles } from "./styled";
import { Button } from "../../../../components/Buttons/SubmitButton";
// eslint-disable-next-line max-len
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function TermsAndConditionsDialog({
  open,
  handleAccept,
  kfsUrl,
  height,
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
      classes={{
        container: classes.container,
        paper: classes.noTitlePaper
      }}
    >
      <DialogContent
        classes={{ root: classes.content }}
        style={{ paddingTop: "60px" }}
        onScroll={handleScroll}
      >
        <div style={{ height: `${height}px` }}>
          {isDesktop ? (
            <object
              type="application/pdf"
              data={`${kfsUrl}#toolbar=0&view=FitH`}
              aria-label="kfs"
              onContextMenu={e => e.preventDefault()}
              className={classes.previewPDF}
              border="0"
              width="100%"
              height="100%"
            ></object>
          ) : (
            <Document file={kfsUrl}>
              <Page pageNumber={1} />
            </Document>
          )}
        </div>
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
