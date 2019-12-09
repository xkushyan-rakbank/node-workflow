import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    fontSize: "48px",
    lineHeight: "56px"
  },
  info: {
    marginBottom: "60px",
    fontSize: "20px",
    lineHeight: "26px"
  }
});

export const FormTitle = ({ title, info }) => {
  const classes = useStyles();
  return (
    <>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.info}>{info}</div>
    </>
  );
};
