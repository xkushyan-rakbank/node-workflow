import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { useStyles } from "./styled";

export const ContexualHelp = ({
  children,
  title = "",
  placement = window.innerWidth < 600 ? "top" : "left",
  isDisableHoverListener = true
}) => {
  const classes = useStyles();

  if (!title) {
    return children;
  }

  return (
    <Tooltip
      disableHoverListener={isDisableHoverListener}
      classes={classes}
      placement={placement}
      title={title}
      enterTouchDelay={0}
      leaveTouchDelay={10000}
      leaveDelay={0}
    >
      {children}
    </Tooltip>
  );
};
