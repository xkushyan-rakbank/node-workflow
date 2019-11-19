import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { useStyles } from "./styled";

export const ContexualHelp = ({ children, placement = "left", title = "" }) => {
  const classes = useStyles();
  return (
    <Tooltip disableHoverListener classes={classes} placement={placement} title={title}>
      {children}
    </Tooltip>
  );
};
