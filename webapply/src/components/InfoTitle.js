import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import cx from "classnames";

import { Icon as IConComponent, ICONS } from "./Icons";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    alignItems: "flex-start",
    fontSize: "12px",
    fontWeight: "normal",
    lineHeight: 1.33,
    color: "#86868b",
    marginTop: "10px",
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
});

export const InfoTitle = ({ styles, typeInfo, ...props }) => {
  const classes = useStyles();
  const Icon = ({ name }) => <IConComponent name={name} alt="info icon" className={classes.icon} />;

  return (
    <div
      className={cx(classes.wrapper, props.className, { [classes.info]: typeInfo })}
      style={{ ...styles }}
    >
      {typeInfo ? <Icon name={ICONS.infoIcYellow} /> : <Icon name={ICONS.infoIc} />}
      <div>{props.title}</div>
    </div>
  );
};
