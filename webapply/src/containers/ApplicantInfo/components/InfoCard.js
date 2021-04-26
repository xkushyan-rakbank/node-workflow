import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import cx from "classnames";

const useStyles = makeStyles({
  box: {
    backgroundColor: "#eaeef1",
    color: "#000",
    padding: "10px",
    position: "relative",
    float: "left",
    fontSize: "14px",
    borderRadius: "5px"
  },

  arrowTop: {
    "&:after": {
      content: "''",
      left: "30px",
      top: "-15px",
      borderTop: "none",
      position: "absolute",
      borderRight: "15px solid transparent",
      borderLeft: "15px solid transparent",
      borderBottom: "15px solid #eaeef1"
    }
  }
});

export const InfoCard = ({ message, classes: extendedClasses }) => {
  const classes = useStyles({ classes: extendedClasses });
  return <div className={cx(classes.box, classes.arrowTop)}>{message}</div>;
};
