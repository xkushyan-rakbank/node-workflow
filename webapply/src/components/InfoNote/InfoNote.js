import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  note: {
    fontSize: 12,
    textAlign: "center",
    color: "#888888",
    display: "block",
    [theme.breakpoints.only("xs")]: {
      marginTop: 20,
      fontSize: 10
    }
  }
}));

export const InfoNote = ({ text, className, ...props }) => {
  const classes = useStyles();

  return (
    <span className={cx(classes.note, className)} {...props}>
      {text}
    </span>
  );
};
