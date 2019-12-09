import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  note: {
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    marginTop: "25px",
    display: "block"
  }
});

export const InfoNote = ({ text, ...props }) => {
  const classes = useStyles();

  return (
    <span className={classes.note} {...props}>
      {text}
    </span>
  );
};
