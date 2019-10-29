import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core";

const styles = {
  container: {
    backgroundColor: "rgba(0,0,0,.3)"
  },
  paper: {
    width: "500px",
    height: "281px",
    borderRadius: "8px",
    boxShadow: "10px 10px 18px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    marginLeft: "35%"
  },
  title: {
    padding: "40px 40px 20px 40px",
    "& > h2": {
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: 1.33,
      letterSpacing: "normal"
    }
  },
  content: {
    padding: "0 40px 40px"
  },
  divider: {
    height: "1px",
    backgroundColor: "#dcdcdc"
  },
  dialogActions: {
    padding: "20px",
    justifyContent: "center"
  },
  buttonSpacing: {
    "& > * + *": {
      marginLeft: "20px"
    }
  },
  actionButton: {
    width: "150px",
    height: "40px",
    borderRadius: "21px",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: 600,
    letterSpacing: "normal"
  }
};

const ConfirmDialog = props => {
  const {
    classes,
    title = "Are you sure?",
    content = "Lorem ipsum dolor sit amet, malesuada mauris amet nulla velit odio cursus, natoque donec luctus integer culpa risus sed ea.",
    cancelLabel = "Cancel",
    successLabel = "Yes, I'm sure",
    handleClose,
    isOpen,
    handler
  } = props;
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      classes={{ container: classes.container, paper: classes.paper }}
    >
      <DialogTitle id="draggable-dialog-title" classes={{ root: classes.title }}>
        {title}
      </DialogTitle>
      <DialogContent classes={{ root: classes.content }}>{content}</DialogContent>
      <div className={classes.divider} />
      <DialogActions classes={{ root: classes.dialogActions, spacing: classes.buttonSpacing }}>
        <Button
          onClick={handler}
          color="primary"
          variant="outlined"
          className={classes.actionButton}
          value={false}
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={handler}
          color="primary"
          variant="contained"
          className={classes.actionButton}
          value={true}
        >
          {successLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(ConfirmDialog);
