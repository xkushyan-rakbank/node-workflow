import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  coloredBackground: {
    background: props => props.color,
    fontSize: "14px",
    fontWeight: 600
  }
});

export const ColoredAvatar = ({ color, children }) => {
  const classes = useStyles({ color });
  return <Avatar className={classes.coloredBackground}>{children}</Avatar>;
};
