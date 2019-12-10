import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formTitle: {
    "& h2": {
      fontSize: "48px",
      lineHeight: "56px"
    },
    "& p": {
      marginBottom: "60px",
      fontSize: "20px",
      color: theme.palette.text.color,
      margin: "20px 0 40px",
      lineHeight: "1.5"
    }
  }
}));

export const FormTitle = ({ title, info }) => {
  const classes = useStyles();
  return (
    <div className={classes.formTitle}>
      <h2>{title}</h2>
      <p>{info}</p>
    </div>
  );
};
