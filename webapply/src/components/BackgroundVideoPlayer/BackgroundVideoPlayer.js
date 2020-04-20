import React, { useContext } from "react";
import { createPortal } from "react-dom";

import { MobileNotificationContext } from "../Notifications/MobileNotification/MobileNotification";
import { ExpandMoreButton } from "./ExpandMoreButton";

import { useStyles } from "./styled";

export const BackgroundVideoPlayer = ({ handleClick, video: { mp4, webm, poster }, ...rest }) => {
  const isMobileNotificationActive = useContext(MobileNotificationContext);
  const classes = useStyles({ isMobileNotificationActive, ...rest });

  return createPortal(
    <div className={classes.container}>
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
        <ExpandMoreButton onClick={handleClick} />
      </div>
    </div>,
    document.getElementById("root")
  );
};
