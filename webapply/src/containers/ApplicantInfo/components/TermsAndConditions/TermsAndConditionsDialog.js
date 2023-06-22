import {
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useStyles } from "./styled";
import { Button } from "../../../../components/Buttons/SubmitButton";
import { PdfPreview } from "./pdfPreview";

export default function TermsAndConditionsDialog({
  open,
  handleAccept,
  kfsUrl,
  height,
  scrollToEnd = false
}) {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(scrollToEnd);
  const [openTooltip, setOpenToolTip] = useState(false);

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        arrow: {
          color: "white"
        },
        tooltip: {
          fontSize: 16,
          color: "black",
          backgroundColor: "white",
          border: "solid 1px rgba(194, 194, 194, 0.56)",
          padding: "10px",
          maxWidth: 500
        }
      }
    }
  });

  const handleScroll = event => {
    setOpenToolTip(false);
    if (!scrollToEnd) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight + 20 >= scrollHeight) {
      setDisabled(false);
    }
  };

  const handleTooltipClose = () => {
    setOpenToolTip(false);
  };

  const handleTooltipOpen = () => {
    setOpenToolTip(true);
  };

  return (
    <Dialog
      open={open}
      classes={{
        container: classes.container,
        paper: classes.noTitlePaper
      }}
    >
      <DialogContent classes={{ root: classes.content }} onScroll={handleScroll}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className={classes.title}>Key Fact Statement</div>
          <MuiThemeProvider theme={theme}>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip
                title=" Please scroll all the way through to continue."
                arrow
                placement="bottom-end"
                open={openTooltip}
              >
                <IconButton onClick={handleTooltipOpen}>
                  <InfoOutlinedIcon classes={classes.iconSize} />
                </IconButton>
              </Tooltip>
            </ClickAwayListener>
          </MuiThemeProvider>
        </div>
        <div className={classes.importantInfo}>
          <div className={classes.impInfoTitle}>IMPORTANT INFORMATION:</div>
          <div>
            A Key Facts Statement (KFS) provides key information about your account. Please read it
            thoroughly. If you do not understand something in the KFS, you should seek independent
            legal advice. We will send a copy to your email address. Scroll down and review the Key
            Fact Statement
          </div>
        </div>

        <PdfPreview file={kfsUrl} />
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
        </div>
      </DialogActions>
    </Dialog>
  );
}
