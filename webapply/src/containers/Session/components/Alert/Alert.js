import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import cx from "classnames";

import routes from "../../../../routes";
import CircularProgress from "../CircularProgress";
import { useStyles } from "./styled";

export const Alert = ({
  type,
  details = "",
  handleClose,
  isOpen,
  handleConfirm,
  percentage = 0,
  progressLabel = "",
  isAgent = false
}) => {
  const classes = useStyles();
  const history = useHistory();

  const redirectToHome = () => {
    history.push(routes.accountsComparison);
    window.location.reload();
  };
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      classes={{ container: classes.container, paper: classes.paper }}
    >
      <DialogTitle id="draggable-dialog-title" classes={{ root: classes.title }}>
        {type === "PROGRESS" ? (
          <CircularProgress percentage={percentage} label={progressLabel} />
        ) : (
          <CloseIcon classes={{ root: classes.iconStyle }} />
        )}
      </DialogTitle>
      {!!details && <DialogContent classes={{ root: classes.content }}>{details}</DialogContent>}

      <div className={classes.divider} />
      <DialogActions classes={{ root: classes.dialogActions, spacing: classes.buttonSpacing }}>
        {type === "PROGRESS" ? (
          <Grid item xs={12} className={cx(classes.btnContainer, classes.ml0)}>
            <Button
              onClick={handleConfirm}
              color="primary"
              variant="contained"
              className={cx(classes.actionButton, classes.ml0)}
            >
              Yes
            </Button>
          </Grid>
        ) : (
          <>
            {isAgent ? (
              <Grid item xs={12} className={classes.agentBtnContainer}>
                <Button
                  onClick={handleConfirm}
                  color="primary"
                  variant="contained"
                  className={classes.agentActionButton}
                >
                  Continue
                </Button>
              </Grid>
            ) : (
              <>
                <Grid item xs={6} className={classes.btnContainer}>
                  <Button
                    onClick={redirectToHome}
                    color="primary"
                    variant="outlined"
                    className={classes.actionButton}
                  >
                    No, Thanks
                  </Button>
                </Grid>

                <Grid item xs={6} className={cx(classes.btnContainer, classes.ml0)}>
                  <Button
                    onClick={handleConfirm}
                    color="primary"
                    variant="contained"
                    className={classes.actionButton}
                  >
                    Continue
                  </Button>
                </Grid>
              </>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
