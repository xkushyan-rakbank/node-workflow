import React from "react";
import ReactDOM from "react-dom";

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    maxHeight: "100vh"
  },
  video: {
    position: "absolute",
    zIndex: 1,
    minWidth: "100%",
    minHeight: "100vh"
  },
  buttonContainer: {
    position: "absolute",
    left: 530,
    right: 0,
    bottom: 40,
    zIndex: 3,
    display: "flex",
    justifyContent: "center"
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
    color: "#373737",
    fontSize: "24px",
    marginLeft: 18,
    pointerEvents: "none"
  }
};

class BackgroundVideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.videoBg = document.createElement("div");
  }

  componentDidMount() {
    appRootEl.prepend(this.videoBg);
  }

  componentWillUnmount() {
    appRootEl.removeChild(this.videoBg);
  }

  render() {
    const { classes, nextElementPosition, videoUrl, handleClick } = this.props;
    const video = (
      <div
        style={{ top: `-${100 * nextElementPosition}vh` }}
        className={classes.container}
      >
        <video
          autoPlay
          loop
          muted
          id="video-background"
          className={classes.video}
          key={videoUrl}
        >
          <source src={videoUrl} />
        </video>

        <div className={classes.buttonContainer}>
          <Fab
            variant="extended"
            className={classes.scrollButton}
            name={1}
            onClick={handleClick}
          >
            Read more
            <ExpandMoreIcon classes={{ root: classes.expandMoreIc }} />
          </Fab>
        </div>
      </div>
    );

    return ReactDOM.createPortal(video, this.videoBg);
  }
}

export default withStyles(styles)(BackgroundVideoPlayer);
