import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { useStylesArrow } from "./styled";

function ContexualHelp(props) {
  const { arrow, ...classes } = useStylesArrow();
  return (
    <Tooltip
      disableHoverListener
      classes={classes}
      placement={props.placement}
      title={props.title || ""}
    >
      {props.children}
    </Tooltip>
  );
}

export default ContexualHelp;
