import React from "react";
import { Modal, Backdrop, Fade, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyle = makeStyles(theme => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "auto",
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: "20px"
  },
  text: {
    marginTop: "16px",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    color: "#1F1F1F",
    textAlign: "center"
  },
  uploadModalCloseIcon: {
    position: "absolute",
    right: "18px",
    top: "20px",
    width: "16px",
    height: "16px",
    fill: "#525252",
    PointerEvent: "cursor",
    [theme.breakpoints.down("md")]: {
      top: "14px"
    }
  },
  info: {
    background: "#ECF9F2",
    padding: "16px 24px",
    color: "#157947",
    fontSize: "12px",
    fontWeight: 500,
    textAlign: "center",
    borderRadius: "10px"
  }
}));

export const InfoModal = ({ open, text, info, handleClose }) => {
  const classes = useStyle();

  return (
    <Modal
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <Box className={classes.paper}>
          <CloseIcon onClick={handleClose} className={classes.uploadModalCloseIcon} />
          <div className={classes.info}>{info}</div>
          <div className={classes.text}>{text}</div>
        </Box>
      </Fade>
    </Modal>
  );
};
