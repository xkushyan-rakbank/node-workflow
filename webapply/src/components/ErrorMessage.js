import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import ErrorIcon from "./../assets/images/error.svg";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import { withStyles } from "@material-ui/core/styles";

const style = {
  error: {
    fontSize: "12px",
    marginTop: "10px !important",
    position: "relative",
    "& p": {
      lineHeight: "1",
      margin: "0",
      color: "#ea2b1e"
    },
    "& img": {
      marginRight: "5px"
    }
  },
  multiLineError: {
    position: "absolute",
    right: "-21px",
    top: "-47px",
    fontSize: "18px",
    color: "#ea2b1e"
  }
};

const ErrorMessage = ({ error, multiLineError, classes }) => {
  return (
    <div className={classes.error}>
      <div className="flexAlignCenter">
        <img src={ErrorIcon} alt="erorr" />
        <p>{error}</p>
        {!!multiLineError && (
          <Tooltip
            title={multiLineError}
            placement="right"
            className={classes.multiLineError}
          >
            <InfoIcon />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default withStyles(style)(ErrorMessage);
