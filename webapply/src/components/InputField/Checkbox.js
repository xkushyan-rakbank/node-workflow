import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Check from "./../../assets/images/on.svg";

const style = {
  checkboxWrapper: {
    display: "flex"
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
    width: "24px",
    height: "24px",
    border: "solid 2px #16216a",
    borderRadius: "8px",
    transition: "all 150ms",
    position: "relative",
    "& img": {
      position: "absolute",
      top: "-2px",
      left: "-2px",
      right: "",
      bottom: "0"
    }
  },
  label: {
    marginLeft: "8px",
    userSelect: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "24px"
  }
};

const CustomCheckbox = ({ classes, checked, field, label, ...props }) => (
  <label className={classes.checkboxWrapper}>
    <div className={classes.checkboxContainer}>
      <input
        {...field}
        {...props}
        type="checkbox"
        checked={field.value}
        className={classes.hiddenCheckbox}
      />
      <div className={classes.styledCheckbox}>
        {field.value && <img src={Check} alt="" />}
      </div>
    </div>
    <span className={classes.label}>{label}</span>
  </label>
);

export default withStyles(style)(CustomCheckbox);
