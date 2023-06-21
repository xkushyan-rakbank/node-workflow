import React, { memo } from "react";
import { makeStyles, styled } from "@material-ui/core/styles";

import { Icon, ICONS } from "./Icons";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    fontSize: "12px",
    fontWeight: "normal",
    lineHeight: 1.33,
    color: "#86868b",
    marginTop: "4px!important",
    ".formControl &": {
      marginTop: "10px"
    },
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

const InfoTitleBase = ({
  title,
  showCharLength,
  charLength,
  totalLength,
  iconName = ICONS.info,
  showIcon = false,
  ...props
}) => {
  const classes = useStyles(props);
  return (
    <div className={classes.wrapper}>
      {showIcon && <IconStyled name={iconName} />}
      <div>{title}</div>
    </div>
  );
};

export const InfoTitle = memo(InfoTitleBase);
