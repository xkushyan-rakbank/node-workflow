import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HelpTooltip from "./HelpTooltip";

const useStyles = makeStyles({
  wrapper: {
    margin: "24px 0 10px",
    fontSize: "16px",
    lineHeight: 1.5,
    color: "#373737",
    display: "flex"
  },
  divider: {
    width: "5px",
    height: "24px",
    borderRadius: "2px",
    backgroundColor: "#517085",
    marginRight: "11px"
  }
});

export const Subtitle = ({ title, helpMessage, classes: extendedClasses }) => {
  const classes = useStyles({ classes: extendedClasses });
  return (
    <div className={classes.wrapper}>
      {title} {helpMessage && <HelpTooltip message={helpMessage} />}
    </div>
  );
};
