import React from "react";
import ErrorIcon from "./../../../assets/images/error.svg";
import { withStyles } from "@material-ui/core/styles";
import { style } from "./styled";

const ErrorMessageComponent = ({ error, classes }) => (
  <div className={classes.error}>
    <div className="flexAlignCenter">
      <img src={ErrorIcon} alt="error" />
      <p>{error}</p>
    </div>
  </div>
);

export const ErrorMessage = withStyles(style)(ErrorMessageComponent);
