import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

const useStyles = makeStyles(theme => ({
  note: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    borderRadius: "10px",
    background: "#F5F5F5",
    "& svg": {
      fill: "#757575",
      width: "14px",
      height: "14px"
    },
    "& span": {
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#525252",
      marginLeft: "8px"
    }
  }
}));

export const DisclaimerNote = ({ text, className, customIcon, ...props }) => {
  const classes = useStyles();

  return (
    <div className={cx(classes.note, className)} {...props}>
      {customIcon ? customIcon : <ErrorOutlineOutlinedIcon />}
      <span>{text}</span>
    </div>
  );
};
