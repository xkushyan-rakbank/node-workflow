import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { useStyles } from "./styled";

export const ContextualHelp = ({
  children,
  title = "",
  placement = "left",
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
    >
      {children}
    </Tooltip>
  );
};
