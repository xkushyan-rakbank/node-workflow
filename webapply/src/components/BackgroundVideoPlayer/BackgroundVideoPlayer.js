import React, { useContext } from "react";
import { createPortal } from "react-dom";
import cx from "classnames";

import Fab from "@material-ui/core/Fab/index";
import expandMoreIcon from "../../assets/icons/arrowDown.svg";
import { useStyles } from "./styled";
import { MobileNotificationContext } from "../Notifications/MobileNotification/MobileNotification";

export const BackgroundVideoPlayer = ({
  handleClick,
  currentSectionIndex,
  handleClickMobile,
  videoWrapperClass,
  video: { mp4, webm, poster }
}) => {
  const isMobileNotificationActive = useContext(MobileNotificationContext);
  const classes = useStyles({ isMobileNotificationActive, currentSectionIndex });

  return createPortal(
    <div className={cx(classes.container, videoWrapperClass)}>
      <video
        muted
        id="video-background"
        className={classes.video}
        key={mp4}
        poster={poster}
        playsInline
        autoPlay
        loop
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
    </div>,
    document.getElementById("root")
  );
};
