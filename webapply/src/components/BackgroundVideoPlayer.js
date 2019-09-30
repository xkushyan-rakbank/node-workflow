import React from "react";
import ReactDOM from "react-dom";

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import expandMoreIcon from "../assets/icons/arrow-down.png";

const appRootEl = document.getElementById("root");

const styles = {
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: "top 400ms",
    overflow: "hidden",
    maxHeight: "100vh",
    zIndex: 11
  },
  video: {
    position: "absolute",
    zIndex: 10,
    minWidth: "100%",
    minHeight: "100vh"
  },
  buttonContainer: {
    position: "absolute",
    left: 530,
    right: 0,
    bottom: 40,
    zIndex: 15,
    display: "flex",
    justifyContent: "center",
    "@media only screen and (max-width: 1300px)": {
      left: "45%"
    }
  },
  scrollButton: {
    width: "195px",
    height: "56px",
    borderRadius: "28px",
    backgroundColor: "#fff",
    boxShadow: "none",
    fontSize: "18px",
    textTransform: "inherit",
    letterSpacing: "normal"
  },
  expandMoreIc: {
    width: "22px",
    marginLeft: 18,
    pointerEvents: "none"
  }
};

class BackgroundVideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.videoBg = document.createElement("div.");
    this.videoBg.className = "videoBg";
  }

  componentDidMount() {
    appRootEl.insertBefore(this.videoBg, appRootEl.childNodes[0]);
  }

  componentWillUnmount() {
    appRootEl.removeChild(this.videoBg);
  }

  render() {
    const { classes, nextElementPosition, videoUrl, handleClick } = this.props;
    const video = (
      <div style={{ top: `-${100 * nextElementPosition}vh` }} className={classes.container}>
        <video autoPlay loop muted id="video-background" className={classes.video} key={videoUrl}>
          <source src={videoUrl} />
        </video>

        <div className={classes.buttonContainer}>
          <Fab variant="extended" className={classes.scrollButton} name={1} onClick={handleClick}>
            Read more
            <img src={expandMoreIcon} className={classes.expandMoreIc} alt="scroll down" />
          </Fab>
        </div>
      </div>
    );

    return ReactDOM.createPortal(video, this.videoBg);
  }
}

export default withStyles(styles)(BackgroundVideoPlayer);
