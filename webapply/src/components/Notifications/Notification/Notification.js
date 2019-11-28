import React from "react";

import errorAlert from "../../../assets/icons/errorAlert.png";
import closeIcon from "../../../assets/icons/closeIcon.png";
import { useStyles } from "./styled";

export const Notification = ({
  onClose,
  icon = <img src={errorAlert} alt="errorIcon" />,
  title = "Server error",
  message = "Oops, something went wrong with our servers. Please wait a bit and try again."
}) => {
  const classes = useStyles();

  return (
    <div className={classes.errorAlert}>
      <div className={classes.icon}>{icon}</div>

      <div className={classes.errorMessage}>
        <h6 className={classes.errorReason}>{title}</h6>
        <p className={classes.errorDescription}>{message}</p>
      </div>

      <div className={classes.closeIconWrapper}>
        <img src={closeIcon} alt="closeIcon" className={classes.closeIcon} onClick={onClose} />
      </div>
    </div>
  );
};
