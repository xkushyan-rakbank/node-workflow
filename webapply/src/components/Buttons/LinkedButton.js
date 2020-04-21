import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "14px 0",
    cursor: "pointer"
  },
  buttonStyle: {
    display: "flex",
    backgroundColor: "#fff",
    height: "32px",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "none",
    borderRadius: "28px",
    border: "1px solid #373737",
    padding: "3px 15px",
    minWidth: "120px",
    width: "60%",
    fontFamily: "Open Sans",
    "&:hover": {
      backgroundColor: "#000",
      "& span": {
        color: "#fff"
      }
    }
  },
  labelStyle: {
    display: "block",
    color: "#373737",
    fontSize: "14px",
    textAlign: "center"
  }
});

export const LinkedButton = ({ label, ...rest }) => {
  const classes = useStyles(rest);

  return (
    <div className={classes.link} {...rest}>
      <div className={classes.buttonStyle}>
        <span className={classes.labelStyle}>{label}</span>
      </div>
    </div>
  );
};
