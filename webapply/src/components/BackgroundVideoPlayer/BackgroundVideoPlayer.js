import React, { useContext } from "react";
import { createPortal } from "react-dom";
import cx from "classnames";

import { MobileNotificationContext } from "../Notifications/MobileNotification/MobileNotification";
import { ExpandMoreButton } from "./ExpandMoreButton";

import { useStyles } from "./styled";

export const BackgroundVideoPlayer = ({
  handleClick,
  videoWrapperClass,
  videoClass,
  video: { mp4, webm, poster }
}) => {
  const isMobileNotificationActive = useContext(MobileNotificationContext);
  const classes = useStyles({ isMobileNotificationActive });

  return createPortal(
    <div className={cx(classes.container, videoWrapperClass)}>
      <video
        muted
        id="video-background"
        className={cx(classes.video, videoClass)}
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
        <ExpandMoreButton onClick={handleClick} />
      </div>
    </div>,
    document.getElementById("root")
  );
};
