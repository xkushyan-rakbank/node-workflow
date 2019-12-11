import React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import cx from "classnames";

import { Icon, ICONS } from "./Icons";

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
  }
});

const IconStyled = styled(Icon)({
  margin: "1px 6.4px 0 0",
  width: "16px"
});

IconStyled.defaultProps = {
  alt: "info icon"
};

export const InfoTitle = ({ styles, typeInfo, ...props }) => {
  const classes = useStyles();
  return (
    <div
      className={cx(classes.wrapper, props.className, { [classes.info]: typeInfo })}
      style={{ ...styles }}
    >
      {typeInfo ? <IconStyled name={ICONS.infoYellow} /> : <IconStyled name={ICONS.info} />}
      <div>{props.title}</div>
    </div>
  );
};
