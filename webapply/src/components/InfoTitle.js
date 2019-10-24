import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";
import infoIc from "../assets/icons/info.png";

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "flex-start",
    fontSize: "12px",
    fontWeight: "normal",
    lineHeight: 1.33,
    color: "#86868b",
    marginTop: "10px !important",
    "& div": {
      display: "flex",
      alignItems: "center",
      minHeight: "18px"
    }
  },
  icon: {
    margin: "1px 6.4px 0 0",
    width: "16px"
  }
};

const InfoTitle = ({ classes, styles, ...props }) => {
  return (
    <div className={cx(classes.wrapper, props.className)} style={{ ...styles }}>
      <img src={infoIc} alt="info icon" className={classes.icon} />
      <div>{props.title}</div>
    </div>
  );
};

export default withStyles(styles)(InfoTitle);
