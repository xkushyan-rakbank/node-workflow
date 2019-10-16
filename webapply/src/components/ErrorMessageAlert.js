import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  errorAlert: {
    position: "fixed",
    top: "10px",
    right: "10px",
    width: "450px",
    height: "86px",
    borderRadius: "6px",
    boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.08)",
    border: "solid 1px #efefef",
    backgroundColor: "#ffffff",
    display: "flex",
    color: "#373737"
  },
  icon: {
    width: "86px",
    height: "85px",
    flex: "0 0 86px",
    backgroundColor: "#000",
    borderTopLeftRadius: "6px",
    borderBottomLeftRadius: "6px"
  },
  errorMessage: {
    paddingLeft: "17px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  errorReason: {
    margin: "0 0 3px 0",
    fontSize: "14px",
    fontWeight: "600"
  },
  errorDescription: {
    margin: "0",
    fontSize: "12px",
    lineHeight: 1.33,
    color: "#86868b"
  }
};

const ErrorMessageAlert = ({ classes }) => {
  return (
    <div className={classes.errorAlert}>
      <div className={classes.icon}></div>

      <div className={classes.errorMessage}>
        <h6 className={classes.errorReason}>No connection</h6>
        <p className={classes.errorDescription}>Somthing to do with your data not being saved.</p>
      </div>
    </div>
  );
};

export default withStyles(style)(ErrorMessageAlert);
