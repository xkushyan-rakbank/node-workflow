import React from "react";

import { Icon, ICONS } from "../../../components/Icons";
import { useStyles } from "./styled";

export const Notification = ({
  onClose,
  icon = ICONS.lock,
  title = "Server error",
  message = "Oops, something went wrong with our servers. Please wait a bit and try again."
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
      </div>

      <div className={classes.closeIconWrapper}>
        <Icon name={ICONS.close} className={classes.closeIcon} onClick={onClose} />
      </div>
    </div>
  );
};
