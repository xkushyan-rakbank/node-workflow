import React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "14px 0"
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
};

const ButtonLink = ({
  label,
  to,
  customLinkStyle = "",
  customButtonStyle = "",
  customLabelStyle = "",
  classes
}) => (
  <Link to={to} className={cx(classes.link, customLinkStyle)}>
    <div className={cx(classes.buttonStyle, customButtonStyle)}>
      <span className={cx(classes.labelStyle, customLabelStyle)}>{label}</span>
    </div>
  </Link>
);

export const LinkedButton = withStyles(styles)(ButtonLink);
