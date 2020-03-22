import React, { useContext } from "react";
import { createPortal } from "react-dom";
import cx from "classnames";

import { MobileNotificationContext } from "../Notifications/MobileNotification/MobileNotification";
import { ExpandMoreButton } from "./ExpandMoreButton";

import { useStyles } from "./styled";

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
        <ExpandMoreButton className={classes.hideOnMobile} onClick={handleClick} />
        <ExpandMoreButton className={classes.displayOnMobile} onClick={handleClickMobile} />
      </div>
    </div>,
    document.getElementById("root")
  );
};
