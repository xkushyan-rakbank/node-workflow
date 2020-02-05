import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import expandMoreIcon from "../assets/icons/arrowDown.svg";
import { sideNavWidthXL, sideNavWidthLG, sideNavWidthMD } from "../constants/styles";
import { mobileResolution, normalScrollHeight } from "../constants";
const appRootEl = document.getElementById("root");

const styles = {
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: "transform 400ms",
    overflow: "hidden",
    maxHeight: "100vh",
    zIndex: 11,
    [`@media only screen and (max-width: ${mobileResolution}px), 
    (max-height: ${normalScrollHeight}px)`]: {
      top: "0!important"
    }
  },
  video: {
    position: "absolute",
    zIndex: 10,
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    minWidth: "100%",
    minHeight: "100%",
    width: "auto",
    height: "auto",
    overflow: "hidden",
    [`@media only screen and (max-width: ${mobileResolution}px) and (max-height: 750px)`]: {
      paddingTop: "130px"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      height: "min-content"
    }
  },
  buttonContainer: {
    position: "absolute",
    left: sideNavWidthXL,
    right: 0,
    bottom: 40,
    zIndex: 15,
    display: "flex",
    justifyContent: "center",
    "@media only screen and (max-width: 1420px)": {
      left: sideNavWidthLG
    },
    "@media only screen and (max-width: 1300px)": {
      left: `${sideNavWidthMD}px`
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      left: 0,
      textAlign: "center"
    }
  },
  scrollButton: {
    minWidth: "195px",
    minHeight: "56px",
    borderRadius: "28px",
    backgroundColor: "#fff",
    boxShadow: "none",
    fontSize: "18px",
    textTransform: "inherit",
    letterSpacing: "normal",
    padding: "12px 30px",
    height: "auto",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      minHeight: "48px"
    }
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
    this.videoBg = document.createElement("div");
    this.videoBg.className = "videoBg";
  }

  componentDidMount() {
    appRootEl.insertBefore(this.videoBg, appRootEl.childNodes[0]);
  }

  componentWillUnmount() {
    appRootEl.removeChild(this.videoBg);
  }

  getPlayedVideos = () => JSON.parse(localStorage.getItem("videoAlreadyPlayed"));

  onEndedVideoPLay = e => {
    const playedVideos = this.getPlayedVideos();
    const videoName = e.target.getAttribute("data-name");
    const updateStore = data => localStorage.setItem("videoAlreadyPlayed", JSON.stringify(data));

    if (playedVideos !== null) {
      playedVideos.push(videoName);
      updateStore(playedVideos);
    } else {
      updateStore([videoName]);
    }
  };

  onLoadedDataVideo = e => {
    const currentVideoName = e.target.getAttribute("data-name");
    const videos = this.getPlayedVideos();

    if (videos) {
      if (!videos.includes(currentVideoName)) {
        e.target.play();
      }
    } else {
      e.target.play();
    }
  };

  render() {
    const playedVideos = this.getPlayedVideos();
    const {
      classes,
      nextElementPosition,
      handleClick,
      handleClickMobile,
      videoWrapperClass,
      video: { mp4, webm, poster }
    } = this.props;

    const video = (
      <div
        style={{ transform: `translateY(-${100 * nextElementPosition}vh)` }}
        className={cx(classes.container, videoWrapperClass)}
      >
        <video
          muted
          id="video-background"
          className={classes.video}
          key={mp4}
          data-name={mp4}
          onEnded={this.onEndedVideoPLay}
          onLoadedData={this.onLoadedDataVideo}
          poster={playedVideos && playedVideos.includes(mp4) ? poster : ""}
        >
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>

        <div className={classes.buttonContainer}>
          <Fab
            variant="extended"
            className={`${classes.scrollButton} hide-on-mobile`}
            name={1}
            onClick={handleClick}
          >
            Read more
            <img src={expandMoreIcon} className={classes.expandMoreIc} alt="scroll down" />
          </Fab>
          <div className="show-on-mobile">
            <Fab
              variant="extended"
              className={classes.scrollButton}
              name={1}
              onClick={handleClickMobile}
            >
              Read more
              <img src={expandMoreIcon} className={classes.expandMoreIc} alt="scroll down" />
            </Fab>
          </div>
        </div>
      </div>
    );

    return ReactDOM.createPortal(video, this.videoBg);
  }
}

export default withStyles(styles)(BackgroundVideoPlayer);
