import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Check from "./../../assets/images/on.svg";

const style = {
  checkboxWrapper: {
    display: "inline-flex",
    cursor: "pointer"
  },
  checkboxContainer: {
    display: "inline-block",
    verticalAlign: "middle"
  },
  icon: {
    fill: "none",
    stroke: "white",
    strokeWidth: "2px"
  },
  hiddenCheckbox: {
    border: "0",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
    "&:focus + &": {
      boxShadow: "0 0 0 3px pink"
    }
  },
  styledCheckbox: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    border: "solid 2px #16216a",
    borderRadius: "8px",
    transition: "all 150ms",
    position: "relative",
    "& img": {
      position: "absolute",
      top: "-2px",
      left: "-2px",
      bottom: "0"
    }
  },
  label: {
    marginLeft: "8px",
    userSelect: "none",
    cursor: "pointer",
    fontSize: "14px",
    lineHeight: "24px",
    color: "#373737",
    "& a": {
      color: "#373737"
    }
  }
};

const CustomCheckbox = ({ classes, checked, field, label, ...props }) => {
  const value = field ? field.value : props.value;
  return (
    <label className={classes.checkboxWrapper}>
      <div className={classes.checkboxContainer}>
        <input
          {...field}
          {...props}
          type="checkbox"
          checked={value}
          className={classes.hiddenCheckbox}
        />
        <div className={classes.styledCheckbox}>
          {value && <img src={Check} alt="" />}
        </div>
      </div>
      <span className={classes.label}>{label}</span>
    </label>
  );
};

export default withStyles(style)(CustomCheckbox);
