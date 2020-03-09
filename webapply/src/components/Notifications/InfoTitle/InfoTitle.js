import React, { memo } from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";
import infoIcon from "./../../../assets/images/info.svg";
import { styles } from "./styled";

const InfoTitleComponent = ({ classes, styles, title, className }) => (
  <div className={cx(classes.wrapper, className)} style={{ ...styles }}>
    <img src={infoIcon} alt="infoIcon" className={classes.icon} />
    <div>{title}</div>
  </div>
);

export const Base = withStyles(styles)(InfoTitleComponent);

export const InfoTitle = memo(Base);
