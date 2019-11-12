import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";
import infoIc from "../assets/icons/info.svg";
import infoIcYellow from "../assets/icons/infoYellow.svg";

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
  },
  info: {
    "& div": {
      color: "#d1af29"
    }
  }
};

const InfoTitle = ({ classes, styles, typeInfo, ...props }) => {
  const Icon = ({ src }) => <img src={src} alt="info icon" className={classes.icon} />;
  return (
    <div
      className={cx(classes.wrapper, props.className, { [classes.info]: typeInfo })}
      style={{ ...styles }}
    >
      {typeInfo ? <Icon src={infoIcYellow} /> : <Icon src={infoIc} />}
      <div>{props.title}</div>
    </div>
  );
};

export default withStyles(styles)(InfoTitle);
