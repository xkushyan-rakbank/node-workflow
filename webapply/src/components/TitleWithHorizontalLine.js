import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    width: "100%",
    textAlign: "left",
    paddingLeft: "20px",
    borderBottom: "1px solid #000",
    lineHeight: "0.1em",
    margin: "20px 0 30px"
  },
  titleText: {
    background: "#fff",
    padding: "0 10px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#373737"
  }
});

export const TitleWithHorizontalLine = props => {
  const classes = useStyles();
  return (
    <p className={classes.title}>
      <span className={classes.titleText}>{props.children}</span>
    </p>
  );
};
