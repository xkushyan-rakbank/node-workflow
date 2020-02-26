import React from "react";

import { Icon, ICONS } from "../Icons";
import { useStyles } from "./styled";

export const Notification = ({
  onClose,
  icon = ICONS.lock,
  title = "Oops!",
  message = "We are facing a glitch at the moment, please try again later.",
  status = "",
  stakTrace = ""
}) => {
  const classes = useStyles();

  return (
    <div className={classes.errorAlert}>
      <div className={classes.icon}>
        <Icon name={icon} />
      </div>

      <div className={classes.errorMessage}>
        <h6 className={classes.errorReason}>{title}</h6>
        <p className={classes.errorDescription}>{message}</p>
        {status && <p className={classes.errorDescription}>{status}</p>}
        {stakTrace && <p className={classes.errorDescription}>{stakTrace}</p>}
      </div>

      <div className={classes.closeIconWrapper}>
        <Icon name={ICONS.close} className={classes.closeIcon} onClick={onClose} />
      </div>
    </div>
  );
};
