import React from "react";
import { Modal, Backdrop, Fade, Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    height: "176px",
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: "20px"
  },

  bottom: {
    color: "rgba(147, 147, 147, 0.1)",
    position: "absolute",
    left: "40%",
    top: "25%"
  },
  top: {
    color: "#848484",
    animationDuration: "550ms",
    position: "absolute",
    left: "40%",
    top: "25%"
  },
  circle: {
    strokeLinecap: "round"
  },
  text: {
    marginTop: "120px",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "20px",
    color: "#757575",
    textAlign: "center"
  }
});

export const OverlayLoader = ({ open, text }) => {
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
          <CircularProgress
            variant="determinate"
            className={classes.bottom}
            thickness={4}
            value={100}
            size={60}
          />
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.top}
            classes={{
              circle: classes.circle
            }}
            thickness={4}
            size={60}
          />
          <div className={classes.text}>{text}</div>
        </Box>
      </Fade>
    </Modal>
  );
};
