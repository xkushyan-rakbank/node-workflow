import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";
import cx from "classnames";

const useStyles = makeStyles(theme => ({
  coloredBackground: {
    background: props => props.color
  },
  coloredAvatar: {
    fontSize: "16px",
    fontWeight: 400,
    width: "32px",
    height: "32px",
    color: "#757575",
    marginRight: "16px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "24px",
      width: "54px",
      height: "54px"
    }
  }
}));

export const ColoredAvatar = ({ color, children }) => {
  const classes = useStyles({ color });
  return (
    <Avatar className={cx(classes.coloredBackground, classes.coloredAvatar)}>{children}</Avatar>
  );
};
