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
    background: "#FDE7E8",
    marginBottom: "16px",
    "& svg": {
      fill: "#8D0C10",
      width: "14px",
      height: "14px"
    },
    "& span": {
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#8D0C10",
      marginLeft: "8px"
    }
  }
}));

export const ErrorInfo = ({ text, className, customIcon, ...props }) => {
  const classes = useStyles();

  return (
    <div className={cx(classes.note, className)} {...props}>
      {customIcon ? customIcon : <ErrorOutlineOutlinedIcon />}
      <span>{text}</span>
    </div>
  );
};
