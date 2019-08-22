import React from "react";
import ErrorIcon from "./../assets/images/error.svg";
import { withStyles } from "@material-ui/core/styles";

const style = {
  error: {
    fontSize: "12px",
    marginTop: "10px !important",
    "& p": {
      lineHeight: "1",
      margin: "0",
      color: "#517085"
    },
    "& img": {
      marginRight: "5px"
    }
  }
};

const ErrorMessage = ({ error, classes }) => {
  return (
    <div className={classes.error}>
      <div className="flexAlignCenter">
        <img src={ErrorIcon} alt="erorr" />
        <p>{error}</p>
      </div>
    </div>
  );
};

export default withStyles(style)(ErrorMessage);
