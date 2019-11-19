import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { useStyles } from "./styled";

export const ContexualHelp = ({ children, title = "", placement = "left" }) => {
  const classes = useStyles();

  if (!title) {
    return children;
  }

  return (
    <Tooltip disableHoverListener classes={classes} placement={placement} title={title}>
      {children}
    </Tooltip>
  );
};
