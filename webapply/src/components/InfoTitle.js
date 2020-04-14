import React, { memo } from "react";
import { makeStyles, styled } from "@material-ui/core/styles";

import { Icon, ICONS } from "./Icons";

const useStyles = makeStyles({
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
  }
});

const IconStyled = styled(Icon)({
  margin: "1px 6.4px 0 0",
  width: "16px",
  height: "16px",
  fill: "#86868b",
  flexShrink: 0
});

IconStyled.defaultProps = {
  alt: "info icon"
};

const InfoTitleBase = ({ title, styles, iconName = ICONS.info, ...extendedClasses }) => {
  const classes = useStyles(extendedClasses);
  return (
    <div className={classes.wrapper} style={{ ...styles }}>
      <IconStyled name={iconName} />
      <div>{title}</div>
    </div>
  );
};

export const InfoTitle = memo(InfoTitleBase);
