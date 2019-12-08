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
    maxWidth: "calc(100% - 20px)",
    height: "86px",
    zIndex: 100,
    borderRadius: "6px",
    boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.08)",
    border: "solid 1px #efefef",
    backgroundColor: "#ffffff",
    display: "flex",
    color: "#373737",
    transform: "translate(120%, 0)",
    opacity: "0",
    visible: "hidden",
    transition: "all 0.4s ease"
  },
  errorAlertActive: {
    transform: "translate(0, 0)",
    opacity: "1",
    visible: "visible"
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

const ErrorMessageAlert = props => {
  const { isVisible, classes } = props;
  const errorAlertActive = isVisible && classes.errorAlertActive;

  const closeErrorAlert = () => props.handleClick();

  return (
    <div className={cx(classes.errorAlert, errorAlertActive)}>
      <div className={classes.icon}>
        <img src={errorAlert} alt="errorIcon" />
      </div>

      <div className={classes.errorMessage}>
        <h6 className={classes.errorReason}>No connection</h6>
        <p className={classes.errorDescription}>Somthing to do with your data not being saved.</p>
      </div>

      <img
        src={closeIcon}
        alt="closeIcon"
        className={classes.closeIcon}
        onClick={closeErrorAlert}
      />
    </div>
  );
};

export default withStyles(style)(ErrorMessageAlert);
