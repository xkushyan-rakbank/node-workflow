import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";
import errorAlert from "./../assets/icons/errorAlert.png";
import closeIcon from "./../assets/icons/closeIcon.png";

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
    color: "#373737",
    transform: "translate(120%, 0)",
    transition: "transform 0.3s ease"
  },
  errorAlertActive: {
    transform: "translate(0, 0)"
  },
  icon: {
    width: "86px",
    height: "85px",
    flex: "0 0 86px",
    backgroundColor: "#000",
    borderTopLeftRadius: "6px",
    borderBottomLeftRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "24px"
    }
  },
  errorMessage: {
    paddingLeft: "17px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    paddingRight: 45
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
  },
  closeIcon: {
    position: "absolute",
    width: 24,
    right: 20,
    top: 20,
    cursor: "pointer"
  }
};

const ErrorMessageAlert = ({ classes, serverError }) => {
  const errorAlertActive = serverError && classes.errorAlertActive;

  return (
    <div className={cx(classes.errorAlert, errorAlertActive)}>
      <div className={classes.icon}>
        <img src={errorAlert} alt="errorIcon" />
      </div>

      <div className={classes.errorMessage}>
        <h6 className={classes.errorReason}>No connection</h6>
        <p className={classes.errorDescription}>Somthing to do with your data not being saved.</p>
      </div>

      <img src={closeIcon} alt="closeIcon" className={classes.closeIcon} />
    </div>
  );
};

export default withStyles(style)(ErrorMessageAlert);
