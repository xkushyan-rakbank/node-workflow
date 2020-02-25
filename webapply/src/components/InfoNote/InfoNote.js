import React from "react";
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

export const InfoNote = ({ text, ...props }) => {
  const classes = useStyles();

  return (
    <span className={classes.note} {...props}>
      {text}
    </span>
  );
};
